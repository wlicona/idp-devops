import requests
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def create_repo(name: str, description: str):

    url = "https://api.github.com/user/repos"

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    data = {
        "name": name,
        "description": description,
        "private": False
    }

    response = requests.post(url, headers=headers, json=data)

    return response.json()