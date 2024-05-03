#! /usr/bin/env python

import requests
import os

DIR=os.getcwd()

def main():

    if os.path.exists(f"{DIR}/styles/Canonical"):
        print("Vale directory exists")
    else:
        os.makedirs(f"{DIR}/styles/Canonical")

    url = "https://api.github.com/repos/canonical/praecepta/contents/styles/Canonical"
    r = requests.get(url)
    for item in r.json():
        download = requests.get(item["download_url"])
        file = open("styles/Canonical/" + item["name"], "w")
        file.write(download.text)
        file.close()

    config = requests.get("https://raw.githubusercontent.com/canonical/praecepta/main/vale.ini")
    file = open("vale.ini", "w")
    file.write(config.text)
    file.close()

if __name__ == "__main__":
    main()