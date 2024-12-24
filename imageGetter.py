from flask import Flask, jsonify, request
from pixivpy3 import *

app = Flask(__name__)

def get_image(id: int) -> list[str]:
    api = AppPixivAPI()
    api.auth(refresh_token='vuYs9sotUjhfNP-_fIkMZyrjBCMvrnFSDzcIMqdVweI')
    json_result = api.illust_detail(id)
    urls = []
    for i in json_result['illust']['meta_pages']:
        url = i['image_urls']['original']
        if url:
            urls.append(url)
    return urls

if __name__ == "__main__":
    print(get_image(125458699))