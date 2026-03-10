import requests
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def create_repo_github(name: str, description: str):

    url = "https://api.github.com/user/repos"

    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    payload = {
        "name": name,
        "description": description,
        "private": False
    }

    response = requests.post(url, headers=headers, json=payload)

    print(response.status_code)
    print(response.text)

    return response.json()