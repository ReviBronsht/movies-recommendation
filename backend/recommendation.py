import pymongo
import numpy as np
import pandas as pd
from pandas import DataFrame
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

def recommend_movies(Title, Type):
    '''
    using cosine similarity, finds similar titles to the user's title
    '''
    
    #Using pymongo gets the db and the collection  from mongoDB
    client = pymongo.MongoClient()
    netflixDB = client["new_netflixDB"]
    titlesCol = netflixDB["titles"]
    
    #gets all titles from the user's type
    df = DataFrame(list(titlesCol.find({"type":Type})))
    print(df.head())
    
    #removing nulls 
    df = df.dropna(subset=["duration","rating","date_added","cast","country","director"])
    df = df.reset_index(drop=True)
    
    #list of important columns for recommendation
    columns = ["director","cast","listed_in", "title","description"]
    #combine important features into a single string
    def get_important_features(data):
        important_features = []
        for i in range(0, data.shape[0]):
            curr = data["director"][i] , data["cast"][i] , data["listed_in"][i] , data["title"][i] , data["description"][i]
            curr = str(curr)
            curr = curr.replace(",","")
            important_features.append(curr)
        return important_features
    #column to hold combined string
    df["important_features"] = get_important_features(df)
    
    #converts text to a matrix of token counts
    cm = CountVectorizer().fit_transform(df["important_features"])


    #cosine similarity will get similarity matrix from token count matrix because it measures similarity between two non zero vectors
    # each column and each row will be a recipe, and the value will be how similar it is one to the other
    # so in the center diagonal line the values will be 1, because its the same recipe, and the similarity will be 100%
    cs = cosine_similarity(cm)
    print(cs)
    print(cs.shape)
    
    #get user's movie_id
    movie_id = df[df.title == Title].index.values[0]
    
    #creates a list of enums for the similarity score, to connect recipe index (which is 0) and its similarity score
    #then sorts list to get highest similarity score, and removes the one with 1 value, since it'll be the 
    # recipe itself
    scores = list(enumerate(cs[movie_id]))
    sorted_scores = sorted(scores, key=lambda x:x[1], reverse=True)
    sorted_scores = sorted_scores[1:]
    
    #print 7 most similar movies
    print("The recommended movies are: ")
    j = 0
    movies = []
    for item in sorted_scores:
        movie_title = df.loc[item[0]].title
        print("#",j+1, movie_title)
        movie = df.loc[item[0],~df.columns.isin(['important_features','_id'])].to_dict()
        movies.append(movie)
        j = j+1
        if j > 6:
            break
    
    print(movies)
    return movies