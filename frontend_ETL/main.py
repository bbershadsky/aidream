# https://geekpython.in/database-in-appwrite-using-python
import os
from dotenv import load_dotenv 
from time import sleep
import time
from functools import wraps

from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage
from appwrite.services.functions import Functions
from appwrite.permission import Permission
from appwrite.role import Role
from appwrite.id import ID

def time_tracker(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()  # Record the start time
        result = func(*args, **kwargs)  # Call the function
        end_time = time.time()  # Record the end time
        print(f"{func.__name__} executed in {end_time - start_time:.4f} seconds.")
        return result
    return wrapper


load_dotenv()

# Helper method to print green colored output.
def p(info):
    print("\033[32;1m"+str(info)+"\033[0m")

client = Client()
client.set_endpoint(os.getenv('VITE_NEXT_PUBLIC_APPWRITE_ENDPOINT')) # Your API Endpoint
client.set_project(os.getenv('VITE_APPWRITE_PROJECT_ID')) # Your project ID
client.set_key(os.getenv('APPWRITE_API_KEY')) # Your secret API key

databases = Databases(client)
storage = Storage(client)
functions = Functions(client)
users = Users(client)

database_id = os.getenv('VITE_APPWRITE_DATABASE_ID')
collection_id = '66a031420005f3d71bd7'

projects_collection_name = os.getenv('APPWRITE_PROJECTS_COLLECTION_NAME')
database_name = os.getenv('APPWRITE_DATABASE_NAME')
document_id = None
user_id = None
# bucket_id = os.getenv('VITE_APPWRITE_BUCKET_ID')
# bucket_name = os.getenv('VITE_APPWRITE_BUCKET_NAME')

file_id = None
document_id = None

users_collection_id = os.getenv('VITE_APPWRITE_USER_COLLECTION_ID')
users_collection_name = os.getenv('VITE_APPWRITE_USERS_COLLECTION_NAME')

@time_tracker
def create_database():
    databases.create(database_id, database_name)

@time_tracker
def create_collection():
    global collection_id

    p("Running Create Collection API")
    response = databases.create_collection(
        database_id,
        collection_id=ID.unique(),
        name=os.getenv('APPWRITE_USERS_COLLECTION_NAME'),
        document_security=True,
        permissions=[
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]
    )

    collection_id = response['$id']
    print(response)

@time_tracker
def create_attributes(collection_id):
    # Proposal
    # attributes = [
    #     ("slug", "string"),
    #     ("businessType", "string"),
    #     ("country", "string"),
    #     ("author", "string50"),
    #     ("body", "string"),
    #     ("name", "string"),
    #     ("title", "string"),
    #     ("description", "string"),
    #     ("language", "string50"),
    #     ("currency", "string50"),
    #     ("image", "string"),
    #     ("body", "string10000"),
    #     ("description", "string10000"),
    #     ("favorited", "boolean"),
    #     ("favoritesCount", "integer"),
    #     # ("tagList", "string50"),
    # ]

    # companies
    attributes = [ 
        ("name", "string"),
        ("businessType", "string"),
        ("bio", "string"),
        ("country", "string"),
        ("website", "string"),
        ("companySize", "integer"),
    ]
    # users
    # attributes = [ 
    #     ("name", "string"),
    #     ("username", "string"),
    #     ("linkedinUrl", "string"),
    #     ("bio", "string"),
    #     ("email", "email"),
    #     ("language", "string20"),
    #     ("image", "string"),
    #     ("jobTitle", "string"),
    #     ("status", "string"),
    #     ("token", "string"),
    #     ("country", "string"),
    #     ("address", "string"),
    #     ("PGPKey", "string"),
    #     ("preferredPaymentMethod", "string"),
    #     ("role", "string"),
    #     ("votesUP", "integer"),
    #     ("votesDN", "integer"),
    # ]
    
    for attr in attributes:
        try:
            if attr[1] == "integer":
                databases.create_integer_attribute(database_id, collection_id, attr[0], False, default=0)
            elif attr[1] == "string":
                default = attr[2] if len(attr) > 2 else None
                databases.create_string_attribute(database_id, collection_id, attr[0], 255, required=False, default=default)
            elif attr[1] == "email":
                default = attr[2] if len(attr) > 2 else None
                databases.create_email_attribute(database_id, collection_id, attr[0], 255, required=False, default=default)
            elif attr[1] == "string20000":
                default = attr[2] if len(attr) > 2 else None
                databases.create_string_attribute(database_id, collection_id, attr[0], 20000, required=False, default=default)
            elif attr[1] == "string10000":
                default = attr[2] if len(attr) > 2 else None
                databases.create_string_attribute(database_id, collection_id, attr[0], 1000, required=False, default=default)
            elif attr[1] == "string50":
                default = attr[2] if len(attr) > 2 else None
                databases.create_string_attribute(database_id, collection_id, attr[0], 50, required=False, default=default)
            elif attr[1] == "boolean":
                databases.create_boolean_attribute(database_id, collection_id, attr[0], False)
            p(f"Attribute {attr[0]} created successfully")
        except Exception as e:
            print(f"Error creating attribute {attr[0]}: {e}")

# create_database()
# collection_id = create_collection()
create_attributes(collection_id)


# create_storage_bucket()
# create_users_collection()