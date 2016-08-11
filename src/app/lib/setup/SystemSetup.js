//import ElectronSettings from 'electron-settings';
import xml2js from 'xml2js';
import Promise from 'promise'
//import DbSchema from '../dal/Schema.js';


export default class SystemSetup{
  constructor(){
    const ElectronSettings = require('electron-settings');
    this.settings = new ElectronSettings({
      configDirPath : process.env.SETUP_PATH
    });
    //console.log(settings);
    //console.log(settings.getConfigFilePath());
    //console.log(settings.get("PATH"));
  }

  preloadDB(){
    var fs = require('fs');
    var parser = new xml2js.Parser();
    var promise = new Promise( (resolve , reject) => {
      fs.readFile(this.settings.get("PATH")["DB_SYNC"], (err,data) =>{
        parser.parseString(data , (perr,result) =>{
          var ALLOWED_LIST = ["product" , "category", "likes", "partners", "reviews", "schedule_m1", "schedule_m2","schedule_m3","schedule_m4","services"];
          var extractedData = {};

          var tables = result.pma_xml_export.database[0].table;
          tables.forEach(table =>{
            if(ALLOWED_LIST.indexOf(table.$.name) >= 0){
              var item = {};
              table.column.forEach(column =>{ item[column.$.name] = column._; });
              if(!extractedData[table.$.name])
                extractedData[table.$.name] = [];

              extractedData[table.$.name].push(item);
            }
          });
          //Schema.populateDb(extractedData);
          //Schema.echoField();
          console.log('Done');

          //console.log(extractedData);
          resolve(extractedData);

        });
      });
    });

    return promise;
  }

}

//let systemSetup = new SystemSetup();
//systemSetup.preloadDB();
//export default systemSetup;
