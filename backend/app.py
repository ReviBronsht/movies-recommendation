from flask import Flask, request, jsonify
import flask
from flask_cors import CORS
from recommendation import recommend_movies
import pymongo

#create app referencing this file
app = Flask(__name__)
cors = CORS(app)

#Using pymongo gets the db and the collection  from mongoDB
client = pymongo.MongoClient()
netflixDB = client["new_netflixDB"]
titlesCol = netflixDB["titles"]

#set up routes & functions that execute on routes

#on homepage on post, gets title and type from the user and runs recommendation script
#on homepage on get, sends to the user the possible titles titles
@app.route('/homepage', methods=['GET','POST'])
def index():
    print(request)
    if request.method == "POST":
        print(request)
        title = request.json["title"]
        type = request.json["type"]
        res = recommend_movies(title,type)
        res = flask.jsonify(res)
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res
    else:
        res = flask.jsonify(list(titlesCol.find({},{"title":1,"type":1,"_id":0})))
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res

#function to get genres from movies and tv shows returned from db   
def get_genres(titles):
    genres = set()
    for title in titles:
        genres.update(set(title["listed_in"].split(", ")))
    return list(genres)
    
#on movies page, sends all movies
@app.route('/movies', methods=['GET'])
def movies():
    print(request)
    titles = list(titlesCol.find({"type":"Movie"},{"_id":0}).limit(50))
    genres = get_genres(titles)
    res = flask.jsonify({ "titles": titles, "genres":genres})
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

#on tv shows page, sends all tv shows
@app.route('/shows', methods=['GET'])
def shows():
    print(request)
    titles = list(titlesCol.find({"type":"TV Show"},{"_id":0}).limit(50))
    genres = get_genres(titles)
    res = flask.jsonify({ "titles": titles, "genres":genres})
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

#if the name is main runs app w/ debugging
if __name__ == "__main__":
    app.run(debug=True)