from PIL import Image
import os
import sys
from flask import Flask, jsonify, request
from flask.cli import load_dotenv
from flask_cors import CORS
from manga_ocr import *
from pixivpy3 import *
import requests
import shutil

app = Flask(__name__)
cors = CORS(app)
# run_with_ngrok(app)

global illust_id

@app.route("/foo")
def foo():
    x = request.args.get('x', default=1, type=int)
    y = request.args.get('y', default=1, type=int)
    value = x + y
    return jsonify({"result": value})

@app.route("/setid", methods=["POST"])
def setid():
    illust_id = request.args.get('id')
    print(illust_id)

@app.route("/dlimg", methods=["POST"])
def get_image():
    id = request.get_json(force=True)['id']
    load_dotenv()
    api = AppPixivAPI()
    api.auth(refresh_token=os.getenv("PIXIV_KEY"))
    json_result = api.illust_detail(id)
    urls = []
    for i in json_result['illust']['meta_pages']:
        url = i['image_urls']['original']
        if url:
            urls.append(url)
            api.download(url, path=os.path.join(os.path.curdir, "images"), name=url.split('/')[-1])
    return jsonify({"id": urls})

if __name__ == "__main__":
    mocr = MangaOcr()
    print(mocr(Image.open('C:\\Users\\ethan\\Pictures\\Screenshots\\e.png')))
    # for image in images:
    #     response = requests.get(image, headers={'Referer': "https://www.pixiv.net/"}, stream=True)
    #     local_filename = image.split('/')[-1]
    #     with open("images/" + local_filename, 'wb') as out_file:
    #         shutil.copyfileobj(response.raw, out_file)
    #     del response
    #     print(image)
    app.run(port=5000, debug=True)