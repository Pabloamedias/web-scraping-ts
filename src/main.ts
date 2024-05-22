import Scraper from "./classes/scraper";
import Converter from "./classes/converter";
import config from "./config";

const companieTopic = config.TOPIC_TO_SCRAP

const scraper = new Scraper(companieTopic);



(async()=>{
    await scraper.initiateScraping()
})().then(()=>{
    const converter = new Converter();
    converter.dataToJSON(scraper.dataCompaniesArray, 'json')
    converter.dataToCSV(scraper.dataCompaniesArray, 'csv')
});{
    
}




  



