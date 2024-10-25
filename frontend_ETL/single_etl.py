import requests
from bs4 import BeautifulSoup
import re
import logging
import urllib3
import os
from appwrite.client import Client
from appwrite.services.databases import Databases
from dotenv import load_dotenv
import json

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables
load_dotenv()

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Appwrite client setup
client = Client()
client.set_endpoint(os.getenv('VITE_NEXT_PUBLIC_APPWRITE_ENDPOINT'))  # Your API Endpoint
client.set_project(os.getenv('VITE_APPWRITE_PROJECT_ID'))  # Your project ID
client.set_key(os.getenv('APPWRITE_API_KEY'))  # Your secret API key

databases = Databases(client)

# Appwrite configuration
database_id = os.getenv('VITE_APPWRITE_DATABASE_ID')
collection_id = os.getenv('VITE_APPWRITE_PRICE_COLLECTION_ID')

# Function to fetch the webpage content
def fetch_page(url):
    headers = {
        'User-Agent': 'Mozilla/5.0',
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

# Helper function to extract JavaScript object assigned to a variable
def extract_js_object(script_str, var_name):
    idx = script_str.find(var_name + ' = ')
    if idx == -1:
        return None
    idx += len(var_name + ' = ')
    while idx < len(script_str) and script_str[idx].isspace():
        idx += 1
    if idx >= len(script_str) or script_str[idx] != '{':
        return None
    idx_start = idx
    brace_count = 1
    idx += 1
    while brace_count > 0 and idx < len(script_str):
        if script_str[idx] == '{':
            brace_count += 1
        elif script_str[idx] == '}':
            brace_count -= 1
        idx += 1
    js_obj_str = script_str[idx_start:idx]
    return js_obj_str

# Helper function to convert JavaScript object notation to JSON string
def js_to_json(js_str):
    js_str = re.sub(r'//.*', '', js_str)
    js_str = re.sub(r'/\*.*?\*/', '', js_str, flags=re.DOTALL)
    js_str = re.sub(r'(\s*)(\w+)\s*:', r'\1"\2":', js_str)
    js_str = js_str.replace("'", '"')
    js_str = re.sub(r',(\s*[}\]])', r'\1', js_str)
    return js_str

# Function to parse the digitalData variable from JavaScript
def parse_digital_data(soup):
    try:
        scripts = soup.find_all('script')
        digital_data_script = None
        for script in scripts:
            if script.string and 'window.digitalData =' in script.string:
                digital_data_script = script.string
                break
        if not digital_data_script:
            logger.error('Could not find the digitalData script.')
            return None
        js_obj_str = extract_js_object(digital_data_script, 'window.digitalData')
        if not js_obj_str:
            logger.error('Could not extract the digitalData object.')
            return None
        json_str = js_to_json(js_obj_str)
        digital_data = json.loads(json_str)
        product = digital_data.get('product', {})

        def safe_float(value_str):
            try:
                return float(value_str)
            except (ValueError, TypeError):
                logger.warning(f"Invalid price value: {value_str}")
                return None

        price_min = safe_float(product.get('priceMin'))
        price_max = safe_float(product.get('priceMax'))

        if price_min is None or price_max is None:
            price_min = safe_float(product.get('priceMinCaqc'))
            price_max = safe_float(product.get('priceMaxCaqc'))

        sku = product.get('sku', 'Unknown SKU')
        name = product.get('name', 'Unknown Product')
        inventory_status = product.get('inventoryStatus', 'Unknown')

        return {
            'priceMin': price_min,
            'priceMax': price_max,
            'SKU': sku,
            'name': name,
            'inventory_status': inventory_status
        }

    except Exception as e:
        logger.error(f'Error parsing digitalData: {e}')
        return None

# Function to parse the adobeProductData variable from JavaScript
def parse_adobe_product_data(soup):
    try:
        scripts = soup.find_all('script')
        adobe_data_script = None
        for script in scripts:
            if script.string and 'var adobeProductData =' in script.string:
                adobe_data_script = script.string
                break
        if not adobe_data_script:
            logger.error('Could not find the adobeProductData script.')
            return None

        price_match = re.search(r'priceTotal:\s*initialize\(([^)]+)\)', adobe_data_script)
        if price_match:
            price_str = price_match.group(1).strip('\'"')
            try:
                price = float(price_str)
                logger.debug(f'Extracted price: {price}')
            except ValueError:
                logger.warning(f"Invalid priceTotal value: {price_str}")
                price = 0.0
        else:
            logger.error('Could not extract priceTotal.')
            return None

        sku_match = re.search(r'SKU:\s*initialize\(([^)]+)\)', adobe_data_script)
        if sku_match:
            sku = sku_match.group(1).strip('\'"')
            logger.debug(f'Extracted SKU: {sku}')
        else:
            logger.error('Could not extract SKU.')
            return None

        name_match = re.search(r"name:\s*'([^']+)'", adobe_data_script)
        name = name_match.group(1) if name_match else 'Unknown'

        image_match = re.search(r"productImageUrl:\s*'([^']+)'", adobe_data_script)
        productImageUrl = image_match.group(1) if image_match else 'No Image'

        quantity_match = re.search(r"quantity:\s*(\d+)", adobe_data_script)
        quantity = int(quantity_match.group(1)) if quantity_match else 1

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
    digital_data = parse_digital_data(soup)
    if digital_data and digital_data['priceMin'] is not None and digital_data['priceMax'] is not None and digital_data['priceMin'] < digital_data['priceMax']:
        logger.debug(f'Product is on sale! Using digitalData.')
        store_price_data_in_appwrite(
            digital_data['SKU'],
            digital_data['priceMin'],
            digital_data['name'],
            'No Image',  # Update if image URL is available
            1  # Update if quantity is available
        )
    else:
        logger.debug(f'No sale detected or invalid prices, falling back to adobeProductData.')
        adobe_product_data = parse_adobe_product_data(soup)
        if not adobe_product_data:
            return
        current_price = adobe_product_data['priceTotal']
        product_id = adobe_product_data['SKU']
        name = adobe_product_data['name']
        productImageUrl = adobe_product_data['productImageUrl']
        quantity = adobe_product_data['quantity']
        if current_price is None or product_id is None:
            return
        store_price_data_in_appwrite(product_id, current_price, name, productImageUrl, quantity)

if __name__ == '__main__':
    URL = 'https://www.costco.ca/northfork-meats-elk-burgers-4-x-113.3-g-4-oz-x-10-pack.product.100106361.html'
    main(URL)
