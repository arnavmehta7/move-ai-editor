import requests
import json

# Define the URL for the test-unit endpoint
url = "http://localhost:8000/test-unit"

# Read the code from a file
with open("move/sources/test_code.move", "r") as file:
    code_content = file.read()

# Create the payload
payload = {
    "code": code_content
}

# Send a POST request to the endpoint
response = requests.post(url, json=payload)

# Print the response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())