import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import logging
import time
import urllib3
import os
from appwrite.client import Client
from appwrite.services.databases import Databases
from dotenv import load_dotenv

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables
load_dotenv()

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Appwrite client setup
client = Client()
client.set_endpoint(os.getenv('VITE_NEXT_PUBLIC_APPWRITE_ENDPOINT')) # Your API Endpoint
client.set_project(os.getenv('VITE_APPWRITE_PROJECT_ID')) # Your project ID
client.set_key(os.getenv('APPWRITE_API_KEY')) # Your secret API key

databases = Databases(client)

# Appwrite configuration
database_id = os.getenv('VITE_APPWRITE_DATABASE_ID')
collection_id = os.getenv('VITE_APPWRITE_PRICE_COLLECTION_ID')

# Function to fetch the webpage content
def fetch_page(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                      ' Chrome/94.0.4606.61 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    try:
        response = requests.get(url, headers=headers, timeout=10, verify=False)
        response.raise_for_status()
        logger.debug('Successfully fetched the page content.')
        return response.text
    except Exception as e:
        logger.error(f'Error fetching the page: {e}')
        return None

# Function to store data in Appwrite
def store_price_data_in_appwrite(product_id, price, name, productImageUrl, quantity):
    try:
        # Insert price data into Appwrite database
        document = databases.create_document(
            database_id=database_id,
            collection_id=collection_id,
            document_id='unique()',
            data={
                "product_id": product_id,
                "price": price,
                "name": name,
                "productImageUrl": productImageUrl,
                "quantity": quantity,
            }
        )
        logger.debug(f'Successfully stored document: {document}')
    except Exception as e:
        logger.error(f'Error storing data in Appwrite: {e}')

# Function to parse the adobeProductData variable from JavaScript
def parse_adobe_product_data(soup):
    try:
        # Find all script tags
        scripts = soup.find_all('script')
        adobe_data_script = None

        # Search for the script containing 'var adobeProductData ='
        for script in scripts:
            if script.string and 'var adobeProductData =' in script.string:
                adobe_data_script = script.string
                break

        if not adobe_data_script:
            logger.error('Could not find the adobeProductData script.')
            return None

        # Extract 'priceTotal' value using regex
        price_match = re.search(r'priceTotal:\s*initialize\(([^)]+)\)', adobe_data_script)
        if price_match:
            price_str = price_match.group(1)
            # Remove quotes if present
            price_str = price_str.strip('\'"')
            price = float(price_str)
            logger.debug(f'Extracted price: {price}')
        else:
            logger.error('Could not extract priceTotal.')
            return None

        # Extract SKU
        sku_match = re.search(r'SKU:\s*initialize\(([^)]+)\)', adobe_data_script)
        if sku_match:
            sku = sku_match.group(1).strip('\'"')
            logger.debug(f'Extracted SKU: {sku}')
        else:
            logger.error('Could not extract SKU.')
            return None

        # Extract name
        name_match = re.search(r"name:\s*'([^']+)'", adobe_data_script)
        name = name_match.group(1) if name_match else 'Unknown'

        # Extract productImageUrl
        image_match = re.search(r"productImageUrl:\s*'([^']+)'", adobe_data_script)
        productImageUrl = image_match.group(1) if image_match else 'No Image'

        # Extract quantity
        quantity_match = re.search(r"quantity:\s*(\d+)", adobe_data_script)
        quantity = int(quantity_match.group(1)) if quantity_match else 1

        # Return a dictionary with the data
        adobe_product_data = {
            'priceTotal': price,
            'SKU': sku,
            'name': name,
            'productImageUrl': productImageUrl,
            'quantity': quantity
        }
        return adobe_product_data

    except Exception as e:
        logger.error(f'Error parsing adobeProductData: {e}')
        return None

# Main script execution
def main(url):
    html_content = fetch_page(url)
    if not html_content:
        return

    soup = BeautifulSoup(html_content, 'html.parser')

    # Parse the adobeProductData from the script
    adobe_product_data = parse_adobe_product_data(soup)
    if not adobe_product_data:
        return

    current_price, product_id, name, productImageUrl, quantity = adobe_product_data['priceTotal'], adobe_product_data['SKU'], adobe_product_data['name'], adobe_product_data['productImageUrl'], adobe_product_data['quantity']
    if current_price is None or product_id is None:
        return

    # Store the price data in Appwrite
    store_price_data_in_appwrite(product_id, current_price, name, productImageUrl, quantity)

if __name__ == '__main__':
    URL = 'https://www.costco.ca/northfork-meats-elk-ground-meat-454-g-1-lb-x-10-pack.product.100571433.html'
    main(URL)

