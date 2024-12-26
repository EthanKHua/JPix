from PIL import Image
from flask import Flask, jsonify, request
from flask_cors import CORS
from manga_ocr import *
from pixivpy3 import *

app = Flask(__name__)
cors = CORS(app)

@app.route("/foo")
def foo():
    x = request.args.get('x', default=1, type=int)
    y = request.args.get('y', default=1, type=int)
    value = x + y
    print(x, y)
    print(value)
    return jsonify({"result": value})

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
    # print(images)
    # mocr = MangaOcr()
    # print(mocr(Image.open('C:\\Users\\ethan\\Pictures\\Screenshots\\bady.png')))
    app.run(debug=True, port=5000)