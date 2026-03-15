import requests
import os

BITBUCKET_USER = os.getenv("BITBUCKET_USER")
BITBUCKET_TOKEN = os.getenv("BITBUCKET_TOKEN")

def create_repo_bitbucket(name, description):

    workspace = BITBUCKET_USER

    url = f"https://api.bitbucket.org/2.0/repositories/{workspace}/{name}"

    headers = {
        "Authorization": f"Bearer {BITBUCKET_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "scm": "git",
        "is_private": False,
        "description": description
    }

    r = requests.post(
        url,
        json=payload,
        headers=headers
    )

    print("STATUS:", r.status_code)
    print("RESPONSE:", r.text)

    return r.json()