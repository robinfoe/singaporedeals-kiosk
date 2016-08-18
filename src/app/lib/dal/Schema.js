import Promise from 'promise'


export default class DbSchema {
  constructor(){
    console.log("constructor DbSchema");
    const lovefield = require('lovefield');
    this.lovefield = lovefield;
    this.schemaMap = this.buildDBField();
    //this.init();
  }

  buildDBField(){
    var schemaMap = {
      name : "singaporedeals4u",
      tables : [
          { // start of product
              name : "product",
              primary : "id",
              columns : [
                {name : "id" , type : lf.Type.INTEGER},
                {name : "category_id" , type : lf.Type.INTEGER},
                {name : "code" , type : lf.Type.STRING},
                {name : "title" , type : lf.Type.STRING},
                {name : "slug" , type : lf.Type.STRING},
                {name : "short_description" , type : lf.Type.STRING},
                {name : "long_description" , type : lf.Type.STRING},
                {name : "adult_price" , type : lf.Type.NUMBER},
                {name : "child_price" , type : lf.Type.NUMBER},
                {name : "image" , type : lf.Type.STRING},
                {name : "sort_order" , type : lf.Type.INTEGER},
                {name : "is_feature" , type : lf.Type.STRING},
                {name : "transpot_type" , type : lf.Type.STRING},
                {name : "transpot_no" , type : lf.Type.STRING},
                {name : "parking" , type : lf.Type.STRING},
                {name : "address" , type : lf.Type.STRING},
                {name : "Language" , type : lf.Type.STRING},
                {name : "museum" , type : lf.Type.INTEGER},
                {name : "accessibiliy" , type : lf.Type.INTEGER},
                {name : "pet_allowed" , type : lf.Type.INTEGER},
                {name : "audio_guide" , type : lf.Type.INTEGER},
                {name : "tour_guide" , type : lf.Type.INTEGER},
                {name : "attraction" , type : lf.Type.INTEGER},
                {name : "wildlife" , type : lf.Type.INTEGER},
                {name : "park" , type : lf.Type.INTEGER},
                {name : "garden" , type : lf.Type.INTEGER},
                {name : "adventure" , type : lf.Type.INTEGER},
                {name : "free_entry" , type : lf.Type.INTEGER},
                {name : "nature" , type : lf.Type.INTEGER},
                {name : "scenic" , type : lf.Type.INTEGER},
                {name : "culture" , type : lf.Type.INTEGER},
                {name : "food" , type : lf.Type.INTEGER},
                {name : "relaxing" , type : lf.Type.INTEGER},
                {name : "activity" , type : lf.Type.INTEGER},
                {name : "one_way_transfer" , type : lf.Type.INTEGER},
                {name : "two_way_transfer" , type : lf.Type.INTEGER},
                {name : "free_and_easy" , type : lf.Type.INTEGER},
                {name : "hours" , type : lf.Type.STRING},
                {name : "promo_adult_price" , type : lf.Type.NUMBER},
                {name : "promo_child_price" , type : lf.Type.NUMBER},
                {name : "feature" , type : lf.Type.STRING},
                {name : "time" , type : lf.Type.STRING},
                {name : "date_mandatory" , type : lf.Type.NUMBER},
                {name : "delivery_option" , type : lf.Type.STRING},
                {name : "d_option" , type : lf.Type.INTEGER},
                {name : "is_on_sale" , type : lf.Type.STRING},
                {name : "is_active" , type : lf.Type.STRING},
                {name : "is_deleted" , type : lf.Type.STRING},
                {name : "dated" , type : lf.Type.DATE_TIME},
                {name : "last_updated" , type : lf.Type.DATE_TIME},
                {name : "rating" , type : lf.Type.NUMBER},
                {name : "sku_id" , type : lf.Type.STRING},
                {name : "mask_id" , type : lf.Type.STRING},
                {name : "sku_id_child" , type : lf.Type.STRING},
                {name : "mask_id_child" , type : lf.Type.STRING},
                {name : "cutoff_day" , type : lf.Type.INTEGER},
                {name : "tour_duration" , type : lf.Type.NUMBER},
                {name : "include_transfer" , type : lf.Type.INTEGER}
              ]
          }, // end of product

          { // start of category
            name : "category",
            primary : "id",
            columns : [
              {name : "id" , type : lf.Type.INTEGER},
              {name : "title" , type : lf.Type.STRING},
              {name : "slug" , type : lf.Type.STRING},
              {name : "description" , type : lf.Type.STRING},
              {name : "sort_order" , type : lf.Type.INTEGER},
              {name : "is_active" , type : lf.Type.STRING},
              {name : "is_deleted" , type : lf.Type.STRING},
              {name : "meta_title" , type : lf.Type.STRING},
              {name : "meta_keyword" , type : lf.Type.STRING},
              {name : "meta_description" , type : lf.Type.STRING},
              {name : "dated" , type : lf.Type.DATE_TIME},
              {name : "last_updated" , type : lf.Type.DATE_TIME}

            ]
          },// end of category

          { // start of likes
            name : "likes",
            primary : "id",
            columns : [
              {name : "id" , type : lf.Type.INTEGER},
              {name : "product_id" , type : lf.Type.INTEGER},
              {name : "user_id" , type : lf.Type.INTEGER},
              {name : "like" , type : lf.Type.INTEGER}
            ]
          },// end of likes

          { // start of reviews
            name : "reviews",
            primary : "id",
            columns : [
              {name : "id" , type : lf.Type.INTEGER},
              {name : "product_id" , type : lf.Type.INTEGER},
              {name : "user_id" , type : lf.Type.INTEGER},
              {name : "username" , type : lf.Type.STRING},
              {name : "email" , type : lf.Type.STRING},
              {name : "review_overall" , type : lf.Type.INTEGER},
              {name : "review_accommodation" , type : lf.Type.INTEGER},
              {name : "review_transport" , type : lf.Type.INTEGER},
              {name : "review_meals" , type : lf.Type.INTEGER},
              {name : "review_guide" , type : lf.Type.INTEGER},
              {name : "review_money" , type : lf.Type.INTEGER},
              {name : "review_program_accuracy" , type : lf.Type.INTEGER},
              {name : "like" , type : lf.Type.STRING},
              {name : "dislikes" , type : lf.Type.STRING},
              {name : "date" , type : lf.Type.DATE_TIME}
            ]
          },// end of reviews


          { // start of users
            name : "users",
            primary : "id",
            columns : [
              {name : "id" , type : lf.Type.INTEGER},
              {name : "name" , type : lf.Type.INTEGER},
              {name : "email" , type : lf.Type.INTEGER},
            ]
          }// end of users


        ],
    };
    return schemaMap;
  }



  init(){
    return new Promise( (resolve , reject) => {
      this.schemaBuilder = this.lovefield.schema.create(this.schemaMap.name, 1);
      //var request = window.indexedDB.deleteDatabase(this.schemaMap.name);
      this.buildSchemaProduct();
      this.getConn().then((db) => {resolve(db);});
    });
  }

  buildSchemaProduct(){
    this.schemaMap.tables.forEach(table => {
      var tab = this.schemaBuilder.createTable(table.name);
      table.columns.forEach(column => {
        tab = tab.addColumn(column.name , column.type);
      });
      tab.addPrimaryKey([table.primary]);
    });
  }

  getConn(){
    return new Promise((resolve,reject)=>{
      if(this.conn){
        resolve(this.conn);
      }
      this.schemaBuilder.connect({storeType: lf.schema.DataStoreType.MEMORY }).then(db => {
        this.conn = db;
        resolve(this.conn);
      });




    });

  }

  getDefaultValue(type){
    if(lf.Type.INTEGER === type)
      return 0;

    if(lf.Type.STRING === type)
      return '';

    if(lf.Type.NUMBER === type)
      return 0;

    if(lf.Type.DATE_TIME === type)
      return new Date();
  }

  convertToType(type,value){
    if(lf.Type.INTEGER === type)
      return parseInt(value);

    if(lf.Type.NUMBER === type)
      return parseInt(value);

      return value;
  }

  sanitizeField(fields, name){
    var tab = this.schemaMap.tables.find(table => table.name === name);
    if(tab){
      tab.columns.forEach(column =>{
        if(!fields[column.name]){
          fields[column.name] = this.getDefaultValue(column.type);
        }

        if(column.type === lf.Type.DATE_TIME)
          fields[column.name] = new Date();

        fields[column.name] = this.convertToType( column.type  , fields[column.name]);

      });
    }
    return fields;

  }

  populateDb(dataset){
    return new Promise( (resolve, reject) => {
      this.getConn().then(db =>{
        ["product","category","likes","reviews"].forEach(tableName =>{
          var table = db.getSchema().table(tableName);
          var rows = [];
          var duplicates = []
          dataset[tableName].forEach(item => {
            item = this.sanitizeField(item,tableName);
            rows.push(table.createRow(item));
          });
          db.insertOrReplace().into(table).values(rows).exec();
        });
        resolve();
      });

    });





  }

  echoField(){
    this.getConn().then(db =>{
      this.conn = db;
      var product = this.conn.getSchema().table('product');
      var category = this.conn.getSchema().table('category');
      this.conn.select(product.id, product.code , product.title, category.id, category.title )
        .from(product)
        .innerJoin(category , product.category_id.eq(category.id))
        .exec()
        .then(rows =>{
          rows.forEach(row =>{
            console.log(row);
          });
        });
    });



  }



}

//let Schema = new DbSchema();
//export default Schema;
