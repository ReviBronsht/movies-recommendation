from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import pymongo
import pandas as pd
from pandas import DataFrame

# set up the Chrome driver
PATH = r"C:\Users\revib\Desktop\Python_test\chromedriver2\chromedriver.exe"
s = Service(PATH)
driver =  webdriver.Chrome(service=s)


def get_image(search_term,title_type):
    try:
        # navigate to the Google Images website
        driver.get("https://www.google.com/imghp")

        # find the search box and input the search term
        search_box = driver.find_element_by_name("q")
        search_box.send_keys(search_term + " " + title_type + " poster")
        search_box.send_keys(Keys.RETURN)

        # find the first image result and extract the image link
        first_image = driver.find_element_by_xpath('//*[@id="islrg"]/div[1]/div[1]/a[1]/div[1]/img')
        image_link = first_image.get_attribute("src")
        
    except:
        image_link = ""

    # return the image link
    return image_link


#get the db
client = pymongo.MongoClient()
netflixDB = client["netflixdb"]
titlesCol = netflixDB["titles"]

df = DataFrame(list(titlesCol.find({})))
print(df.head())
print(len(df))

# df = df.head()
# print(len(df))

#iterate over every record in db and find an image for them
df['image'] = df.apply(lambda x: get_image(x.title, x.type), axis=1)
print(df)


## Saving the dataframe to new db in MongoDB
#
#Creates a new db with a new collection, saves the df as dictionary in records format
#and inserts into the collection
new_netflixDB = client["new_netflixDB"]
new_titlesCol = new_netflixDB["titles"]
data = df.to_dict("records")
for title in data:
    new_titlesCol.insert_one(title)
    
# close the browser window
driver.close()
