import Scraper from "./classes/scraper";
import Converter from "./classes/converter";

const scraper = new Scraper('videojuegos');
const converter = new Converter();


(async()=>{
    await scraper.initiateScraping()
})().then(()=>{
    converter.dataToJSON(scraper.dataCompaniesArray)
    converter.dataToCSV(scraper.dataCompaniesArray)
});{
    
}




  



