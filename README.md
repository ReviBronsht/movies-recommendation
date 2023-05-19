### movies-recommendation

GitHub link: https://github.com/ReviBronsht/movies-recommendation

#### Movies recommendation is a web app that gets the user's favorite netflix movie or tv show and suggests to them similar movies and tv shows. It also lets users browse movies and tv shows by genre.

#### Machine Learning and web scraping in Python, backend in Flask, frontend in React, MongoDB database 

<hr>

### Machine Learning Algorithm


Recommendation: The app uses cosine similarity to recommend movies/tv shows. Cosine similarity is a measure of similarity between two sequences.

It gets movies/tv shows according to the user's request, and creates a cosine similarity matrix from a created column of all relevant text values combined (cast, director, title, description, etc), and finds movies/tv shows with the most similar strings between the combined columns. It sorts them by the similarity score and suggests the most similar ones to the user.

The machine-learning-model folder shows development of the model.

<hr>

### The Server (backend)

Initialization: install dependencies from requirements.txt and run app.py file

The server uses Flask to create a server with several routes to view the tv shows and movies, and run the algorithm. (description of each route in app.js file). 
It connects to local mongodb client with pymongo.

<hr>

### The Client (frontend)

Initialization: npm i && npm start

The homepage lets users pick movies or tv shows from the movies/tv shows avaliable on netflix at the time of db creation, and shows the user the result of the algorithm.

The browse page allows user to browse movies/tv shows according to route.

<hr>

### The Scraper and the Database 

Original netflix titles dataset downloaded from: https://www.kaggle.com/datasets/shivamb/netflix-shows?resource=download
and saved in mongodb compass as "netflixdb"

Webscraper in selenium runs over each title and adds a poster of the title for them to the db from google images, then creates "new_netflixdb"

![image](https://github.com/ReviBronsht/movies-recommendation/assets/97298035/aaad4e04-6cf4-4892-bf47-f3c1fe7a3fc6)
![image](https://github.com/ReviBronsht/movies-recommendation/assets/97298035/65355c4f-cc0e-481f-9d1d-84d384fc3703)
![image](https://github.com/ReviBronsht/movies-recommendation/assets/97298035/0d0d7b21-e645-4341-83ad-9af2ae48096d)
![image](https://github.com/ReviBronsht/movies-recommendation/assets/97298035/55bc2d47-3676-47be-9399-31e2e52a389b)


