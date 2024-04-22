const cheerio = require("cheerio");
const fs = require('fs')
const { Parser } = require('json2csv')
const requestPromise = require("request-promise");

const baseURL = 'https://chileservicios.com'
const companiesTopic = 'videojuegos'

//Arrays
let paginationArray = [];
let companiesUrlArray = [];
let companiesDataArray = [];

//Variables
let lastPageNumber;

//functions

const scraper = async () => {
  try {
    console.log(`Starting scraping process from topic: ${companiesTopic}`)

    console.log(`get lastPageNumber from ${companiesTopic}`)
    let response = await requestPromise(
      `${baseURL}/industrias/${companiesTopic}/`
    );
    let $ = cheerio.load(response)

    //Obtenemos un elemento <ul> de clase "pagination", seleccionamos los elementos <li>,
    // con la condicion que sea el ultimo con .last, seleccionmos el anterior con .prev, 
    // luego seleccionamos un elemento <a> con .find, y finalmente seleccionamos el texto que contiene ese <a>.
    lastPageNumber = Number($('ul.pagination > li').last().prev().find('a').text()) 
    console.log('get lastPageNumber finished')

    console.log('get companies url started')
    for(let i = 0; i < lastPageNumber ; i++){
        if(paginationArray.length === 0){
            paginationArray.push(`${baseURL}/industrias/${companiesTopic}/`)
        }else{
            paginationArray.push(`${baseURL}/industrias/${companiesTopic}/page/${i+1}`)
        }
    }
    console.log('get companies paginations finished')
  
    console.log('get companies url started')
    for(let url of paginationArray){
      response = await requestPromise(url)
      $ = cheerio.load(response);
      $('div[class="card-body"] > a').each(function(){
          companiesUrlArray.push($(this).attr('href'))
      })

    }
    console.log(`get companies urls from topic: ${companiesTopic} finished, there are ${companiesUrlArray.length} companies urls to scrap`)
    

    console.log('Scrape data started')

    for(let companieUrl of companiesUrlArray){
      console.log(`scraping url: ${companieUrl}`);
      response = await requestPromise(companieUrl)
      $ = cheerio.load(response)
      const title = $('div.card-header > h1').text();
      //Para seleccionar un elemento con más de una clase, debo "separar" cada clase con un "."
      const description = $('div.col-md-8.my-2 > p').text()
      const phoneNumber = $('div.col-lg-4.my-2 > div > div > p').first().text().trim()
      const contactMail = $('div.col-lg-4.my-2 > div > div > p').first().next().text()
      const webAddress = $('div.col-lg-4.my-2 > div > div > p').first().next().next().text()
      const resultObject = {
        title,
        category : companiesTopic,
        description,
        phoneNumber,
        contactMail,
        webAddress
      }
      
      companiesDataArray.push(resultObject)
    }
    console.log(`scraping data successful, a total of ${companiesDataArray.length} companies has been scraped`)

    console.log('saving data in a json file')
    let data = JSON.stringify(companiesDataArray);
    fs.writeFileSync("./outputData/jsondata.json", data)
    console.log('saving data in a json file successful')


    console.log('saving data in a csv file')
    const fields = ['title', 'category', 'description', 'phoneNumber', 'contactMail', 'webAdress'];

    const json2csvParser = new Parser({
      fields,
      defaultValue: 'no info'
    })

    const csv = json2csvParser.parse(companiesDataArray)
    fs.writeFileSync('./outputData/results.csv', csv, 'utf-8')
    console.log('saving data in csv file succesful')
  } catch (error) {
    console.error(error);
  }


};
scraper();
