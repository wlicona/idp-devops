import os
import requests
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Autorization": f"token {GITHUB_TOKEN}",
    "Accept": "applicacion/vnd.github+json"
}

def create_repo(name, description="", private=True):

    url = "https://api.github.com/user/repos"

    payload = {
        "name": name,
        "description": description,
        "private": private
    }

    response = requests.post(url, json=payload, headers=headers)

    return response.json()