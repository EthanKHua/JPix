from PIL import Image
from flask import Flask, jsonify, request
from flask_cors import CORS
from manga_ocr import *
from pixivpy3 import *

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
    # images = get_image(125458699)
    # mocr = MangaOcr()
    # print(mocr(Image.open('C:\\Users\\ethan\\Pictures\\Screenshots\\al.jpg')))
    app.run(port=5000)