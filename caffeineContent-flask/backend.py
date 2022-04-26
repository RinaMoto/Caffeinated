from flask import Flask, jsonify, request
import certifi
import csv
import requests 
from requests.structures import CaseInsensitiveDict
import json
from pymongo import MongoClient
from bson.json_util import dumps, loads

app = Flask(__name__)

@app.route('/location')
def find_coffees():
    drinks = []
    client = MongoClient("mongodb+srv://Rina_easterday:1046931703589Bae@cs290.wwlyi.mongodb.net/Usagi_db?retryWrites=true&w=majority", tlsCAFile=certifi.where())
    for x in client.Usagi_db.caffine.find({
        'type': 'Coffee'
    }).limit(20):
        drink_profile = {'name': x['drink']}
        drinks.append(drink_profile)

    return json.dumps(drinks)
    

@app.route('/results', methods=['PUT'])
def find_caffeine():
    caffeine_content = []
    data = request.json
    client = MongoClient("mongodb+srv://Rina_easterday:1046931703589Bae@cs290.wwlyi.mongodb.net/Usagi_db?retryWrites=true&w=majority", tlsCAFile=certifi.where())
   
    for i in data['place']:
        print(i)
        for result in client.Usagi_db.caffine.find({
            'drink': i
        }).limit(1):
            print(result['Volume (ml)'])
            print(result["Caffeine (mg)"])
            one_ml = int(float(result["Caffeine (mg)"])) / int(float(result['Volume (ml)']))
            caf_per_cup = round((236.59 * one_ml), 2)
            caffeine_content.append({"name": i, "Caffeine" :  caf_per_cup})
            print(caffeine_content)

    return json.dumps(caffeine_content)

if __name__ == '__main__':
 
    app.run(host="localhost", port=3000, debug=True)
   
