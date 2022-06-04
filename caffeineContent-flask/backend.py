from PIL import Image
from io import BytesIO
import os
from flask import Flask, request, make_response
import certifi
import scrapetube
import requests 
import json
from pymongo import MongoClient
from dotenv import load_dotenv
app = Flask(__name__)

load_dotenv()
db_pass = os.getenv('DB_PASS')
user_name = os.getenv('USER_NAME')
db_name = os.getenv('DB_NAME')
                      
def client_setup():
    client = MongoClient(f"mongodb+srv://{user_name}:{db_pass}@cs290.wwlyi.mongodb.net/{db_name}?retryWrites=true&w=majority", tlsCAFile=certifi.where())
    return client

@app.route('/', methods=['POST'])
def get_vids():
    if request.method == "POST":
        urls = []
        try:
            videos = scrapetube.get_search(
                "about caffeine",
                limit=3
            )
            count = 0
            for video in videos: 
                urls.append({'url': 'https://www.youtube-nocookie.com/embed/' + video['videoId']})
                count+=1
                
        except:
            return "error fetching videos", 400

        resp = make_response(json.dumps(urls))
        resp.set_cookie('cookie1', 'value1', samesite='Lax')
        resp.headers.add('Set-Cookie','cookie2=value2; SameSite=None; Secure')
        print(json.dumps(urls))
        return resp, 200
    else:
        return "could not fetch videos", 400

@app.route('/drinks', methods=['GET'])
def find_coffees():
    if request.method == 'GET':
        drinks = []
        client = client_setup()

        for x in client.Usagi_db.caffine.find({
            'type': 'Coffee'
        }).limit(40):
            drink_profile = {'name': x['drink']}
            drinks.append(drink_profile)
        
        return json.dumps(drinks)

    else:
        return "bad request", 400
        
@app.route('/results', methods=['POST'])
def find_caffeine():
    if request.method == 'POST':
        caffeine_content = []
        data = request.json
        endpoint = 'https://showboat-rest-api.herokuapp.com/image-transform'
        client = client_setup()
        
        # get image url from database and send to the microservice
        for i in data['place']:
            for result in client.Usagi_db.caffine.find({
                'drink': i
            }).limit(1):
                url = result['url']
                one_ml = int(float(result["Caffeine (mg)"])) / int(float(result['Volume (ml)']))
                caf_per_cup = round((236.59 * one_ml), 2)
                
                payload = {'url': url, 'height': '400', 'width': '300'}

                # get resized image from microservice and write to a local file
                response = requests.post(endpoint, data=payload)
                
                byteImgIO = BytesIO(response.content)
                im = Image.open(byteImgIO)
                rgb_im = im.convert('RGB')

                i = i.replace("'", "")
                im_name = f'{i}' + '.png'
                print(im_name)
                path = f'../caffeineContent/src/images/{im_name}'
                
                rgb_im.seek(0)
                rgb_im.save(path, "PNG")
                print(path)
                caffeine_content.append({"name": i, "Caffeine": caf_per_cup, "url": im_name })

        return json.dumps(caffeine_content)
    else:
        return "bad request", 400

@app.route('/calculator/results', methods=['POST'])
def get_serving():
    if request.method == 'POST':
        json_response = json.loads(request.data)

        drink = json_response["drink"]
        client = client_setup()
        for x in client.Usagi_db.caffine.find({
            'drink': f'{drink}'
        }).limit(1):
            volume = round(float(x['Volume (ml)']), 2)
            content = x['Caffeine (mg)']

        # volume_info to be added to response json from microservice
        volume_info = {"volume": volume, "drink": drink}

        # data to be sent to microservice
        data = {'weight': json_response["weight"], 'weight_units': json_response["unit"], 'content': content, 'content_units': 'mg'}
        
        # call microservice and update json object with max serving amount
        ENDPOINT = f"http://127.0.0.1:4000/max"
        headers = {'Content-type': 'application/json'}
        response = requests.post(ENDPOINT, json=data, headers=headers)
        service_response = response.json()
        service_response.update(volume_info)

        return json.dumps(service_response), 200

    else:
        return "bad request", 400

@app.route('/database', methods=["GET"])
def get_database_info():
        client = client_setup()
        drinks = []

        # get caffeine drink, volume, and content from db
        for x in client.Usagi_db.caffine.find({
            'type': 'Coffee'
        }).limit(40):
            drink = x["drink"]
            volume = round(float(x['Volume (ml)']), 2)
            content = x['Caffeine (mg)']
            drinks.append({"drink": drink, "volume": volume, "content": content})
        
        return json.dumps(drinks)


       

if __name__ == '__main__':
    app.run(host="localhost", port=3000, debug=True)
   
