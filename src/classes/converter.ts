import { DataCompany } from "../interface";
import config from "../config";
import fs from "fs";
import { Parser } from "json2csv";

class Converter {
  basePath: string = config.OUTPUTDATADIRECTORY;
  constructor() {
    if (!fs.existsSync(this.basePath)) {
      console.log(
        `Folder for the output data not detected, creating a new one called: ${this.basePath}`
      );
      fs.mkdirSync(this.basePath);
    }
  }

  dataToJSON(data: DataCompany[], folderName: string): void {
    try {
      console.log("dataToJSON started");
      const destinyPath = `${this.basePath}/${folderName}`;
      console.log(
        `Saving data into a json file in the next path: ${destinyPath}`
      );
      if (!fs.existsSync(destinyPath)) {
        console.log(
          "directory for json files not detected, creating a new one"
        );
        fs.mkdirSync(destinyPath);
      }
      const category = data[0].category;
      const formatedData = JSON.stringify(data);
      fs.writeFileSync(
        `${destinyPath}/companiesData_${category}.json`,
        formatedData
      );
      console.log("dataToJSON finished successfully");
    } catch (error) {
      console.error(`dataToJSON failed, error: ${error}`);
    }
  }

  dataToCSV(data: DataCompany[], folderName: string): void {
    try {
      console.log("dataToCSV started");
      const destinyPath = `${this.basePath}/${folderName}`;
      console.log(
        `Saving data into a json file in the next path: ${destinyPath}`
      );
      if (!fs.existsSync(destinyPath)) {
        console.log("directory for csv files not detected, creating a new one");
        fs.mkdirSync(destinyPath);
      }
      const category = data[0].category;

      const fields = [
        "title",
        "category",
        "description",
        "phoneNumber",
        "contactMail",
        "webAdress",
      ];

      const json2csvParser = new Parser({
        fields,
        defaultValue: "no info",
      });

      const csv = json2csvParser.parse(data);
      fs.writeFileSync(
        `${destinyPath}/companiesData_${category}.csv`,
        csv,
        "utf-8"
      );
      console.log("dataToCSV finished successfully");
    } catch (error) {
      console.error(`dataToCSV failed: ${error}`);
    }
  }
}
export default Converter;
