import requests
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def create_repo_github(name: str, description: str):

    url = "https://api.github.com/user/repos"

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    print("TOKEN:", GITHUB_TOKEN)

    payload = {
        "name": name,
        "description": description,
        "private": False
    }

    response = requests.post(url, headers=headers, json=payload)

    print("STATUS:", response.status_code)
    print("BODY:", response.text)

    if response.status_code != 201:
        return {
            "error": "Failed to create repo",
            "details": response.json()
        }

    return response.json()