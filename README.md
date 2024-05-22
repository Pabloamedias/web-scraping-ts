# web-scraping-ts

A simple web scraper project made with Typescript, request-promise and cheerio.
The website we are scraping is https://chileservicios.com, a page that hasn´t changed that much with the time, so is perfect page to practice web scraping.
In this case, wea are obtaining a serie of companies grouped by a topic.
This data will be stored in json and csv archives categorised by a common topic.

## Content

- [Instalation](#instalation)
- [Usage](#usage)
- [Env](#env)
- [Upcoming Features](#upcoming-features)
-

## Instalation


```sh
git clone https://github.com/Pabloamedias/web-scraping-ts
```

```sh
npm install
```

## Usage

```sh
npm run start
```
Check the default values on config.ts . By default the topic is set to "videojuegos", but you can modify this value by the .env file. 
The application will make a serial of request to the page (the number of request depends of the topic you set).
Then the application will parse this data and save it in a folder, you can set the name and path of the folder in the .env
    
## Env

- BASE_URL : The main site to scrap, change or adjust as you need
- OUTPUT_DATA_DIRECTORY : The folder where the data saves, adjust as you need
- TOPIC_TO_SCRAP : The topic to scrap, you can add another topic of the page. You can scrap many topics as you want (as long is a valid topic of the page, you can see the valid topics in: https://chileservicios.com/empresas/)

## Upcoming Features

 - Scrape all the topics of the page, so then you can scrape all the companies
 - Modify the Scraper class in scraper.ts so can scrape an array of topics
 - Add cases and logs when something fails in the app (wrong url, wron topic, cheerio errors, etc)
