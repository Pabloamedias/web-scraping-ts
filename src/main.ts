import Scraper from "./classes/scraper";
import Converter from "./classes/converter";

const scraper = new Scraper('videojuegos');



(async()=>{
    await scraper.initiateScraping()
})().then(()=>{
    const converter = new Converter();
    converter.dataToJSON(scraper.dataCompaniesArray, 'json')
    converter.dataToCSV(scraper.dataCompaniesArray, 'csv')
});{
    
}




  



