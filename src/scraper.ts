import cheerio from "cheerio";
import requestPromise from "request-promise";
import config from "./config";

class Scraper {
  baseUrl: string = config.BASEURL;
  paginationArray: string[] = [];
  pagesToScrapArray: string[] = [];

   constructor(companiesTopic: string) {
    (async () => {

        const numberOfPages = await this.getNumberOfPagestoScrap(companiesTopic);
        this.getPagesToScrap(numberOfPages, companiesTopic);
    })();
  }

  //Unificar  esta funcion y getPagestoScrap en una sola
  private async getNumberOfPagestoScrap(topic: string): Promise<number> {
    try {
      console.log("getNumberOfPagesToScrap started");
      const response = await requestPromise(
        `${this.baseUrl}/industrias/${topic}`
      );
      const $ = cheerio.load(response);
      const lastPageNumber = Number(
        $("ul.pagination > li").last().prev().find("a").text()
      );
      console.log(`numbers of pages to scrap: ${lastPageNumber} from topic: ${topic}`);
      console.log(`getNumberOfPagesToScrap finished succesfully`);
      return lastPageNumber;
    } catch (error: any) {
      console.error(
        `getNumberOfPagesToScrap failed: statausCodeError: ${error.statusCode}`
      );
    }
    return 0;
  }

  private async getPagesToScrap(
    lastPageNumber: number,
    companiesTopic: string
  ) {
    try {
      console.log("getPagesToScrap started");
      for (let i = 0; i < lastPageNumber; i++) {
        if (this.paginationArray.length === 0) {
          this.paginationArray.push(
            `${this.baseUrl}/industrias/${companiesTopic}/`
          );
        } else {
          this.paginationArray.push(
            `${this.baseUrl}/industrias/${companiesTopic}/page/${i + 1}`
          );
        }
      }
      console.log('getPagesToScrap finished successfully')
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default Scraper;
