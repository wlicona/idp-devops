import requests
import os

GITLAB_USER = os.getenv("GITLAB_USER")
GITLAB_TOKEN = os.getenv("GITLAB_TOKEN")

def create_repo_gitlab(name, description):

    url = f"https://gitlab.com/api/v4/projects"

    headers = {
        "PRIVATE-TOKEN": GITLAB_TOKEN
    }

    payload = {
        "name": name,
        "description": description,
        "visibility": "public"
    }

    r = requests.post(url, headers=headers, json=payload)

    return r.json()