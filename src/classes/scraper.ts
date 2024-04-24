import cheerio from "cheerio";
import requestPromise from "request-promise";
import config from "../config";
import { DataCompany } from "../interface";

class Scraper {
  baseUrl: string = config.BASEURL;
  pagesToScrapArray: string[] = [];
  companiesUrlArray: string[] = [];
  dataCompaniesArray: DataCompany[] = [];

  constructor(private companiesTopic: string) {
    
  }

   async initiateScraping(){
    await this.getPagestoScrap();
    await this.getCompaniesUrl();
    await this.getDataCompany();
    
  }
  

  private async getPagestoScrap(): Promise<void> {
    try {
      console.log("getPagesToScrap started");
      const response = await requestPromise(
        `${this.baseUrl}/industrias/${this.companiesTopic}`
      );
      const $ = cheerio.load(response);
      const lastPageNumber = Number(
        $("ul.pagination > li").last().prev().find("a").text()
      );
      console.log(
        `numbers of pages to scrap: ${lastPageNumber} from topic: ${this.companiesTopic}`
      );

      for (let i = 0; i < lastPageNumber; i++) {
        if (this.pagesToScrapArray.length === 0) {
          this.pagesToScrapArray.push(
            `${this.baseUrl}/industrias/${this.companiesTopic}/`
          );
        } else {
          this.pagesToScrapArray.push(
            `${this.baseUrl}/industrias/${this.companiesTopic}/page/${i + 1}`
          );
        }
      }
      console.log("getPagesToScrap finished successfully");
    } catch (error: any) {
      console.error(`getPagesToScrap failed, error: ${error}`);
    }
  }

  private async getCompaniesUrl(): Promise<void> {
    try {
      console.log("get companies url started");
      for (let url of this.pagesToScrapArray) {
        const response = await requestPromise(url);
        const $ = cheerio.load(response);
        $('div[class="card-body"] > a').each((_index, element) => {
          this.companiesUrlArray.push($(element).attr("href") as string);
        });
      }
      console.log(
        `get companies urls from topic: ${this.companiesTopic} finished, there are ${this.companiesUrlArray.length} companies urls to scrap`
      );
    } catch (error: any) {
      console.error(error);
    }
  }

  private async getDataCompany() {
    try {
      console.log("Scrape data started");

      for (let companieUrl of this.companiesUrlArray) {
        console.log(`scraping url: ${companieUrl}`);
        const response = await requestPromise(companieUrl);
        const $ = cheerio.load(response);
        const title = $("div.card-header > h1").text();
        //Para seleccionar un elemento con más de una clase, debo "separar" cada clase con un "."
        const description = $("div.col-md-8.my-2 > p").text();
        const phoneNumber = $("div.col-lg-4.my-2 > div > div > p")
          .first()
          .text()
          .trim();
        const email = $("div.col-lg-4.my-2 > div > div > p")
          .first()
          .next()
          .text();
        const webAddress = $("div.col-lg-4.my-2 > div > div > p")
          .first()
          .next()
          .next()
          .text();
        const resultObject: DataCompany = {
          title,
          category: this.companiesTopic,
          description,
          phoneNumber,
          email,
          webAddress,
        };

        this.dataCompaniesArray.push(resultObject);
      }
      console.log(
        `scraping data successful, a total of ${this.dataCompaniesArray.length} companies has been scraped`
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export default Scraper;
