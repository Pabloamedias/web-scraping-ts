import { DataCompany } from "../interface";
import fs from 'fs'
import { Parser } from "json2csv";

 class Converter {
    path: string = './outputData'
    constructor() {

    }

    dataToJSON(data: DataCompany[]): void{
        const category = data[0].category
        const formatedData = JSON.stringify(data)
        fs.writeFileSync(`${this.path}/json/companiesData_${category}.json`, formatedData)
    }
    dataToCSV(data: DataCompany[]): void {
        const category = data[0].category
        console.log('saving data in a csv file')
        const fields = ['title', 'category', 'description', 'phoneNumber', 'contactMail', 'webAdress'];
    
        const json2csvParser = new Parser({
          fields,
          defaultValue: 'no info'
        })
    
        const csv = json2csvParser.parse(data)
        fs.writeFileSync(`${this.path}/csv/companiesData_${category}.csv`, csv, 'utf-8')
        console.log('saving data in csv file succesful')

    }
}
export default Converter