
import Promise from 'promise';


export default class ProductReviewService {
    constructor(dbSchema) {
      const lovefield = require('lovefield');
      this.lovefield = lovefield;
      this.dbSchema = dbSchema;

    }

    getReviewCountByProductId(productId){

      return new Promise( (resolve,reject) => {
        this.dbSchema.getConn().then(conn => {
          try{
            var table = conn.getSchema().table('reviews');
            conn.select( lf.fn.count().as('REVIEW_COUNT') , lf.fn.sum(table.review_overall).as('REVIEW_SCORE') )
              .from(table)
              .where(table.product_id.eq(productId))
              .exec().then( (result) => {
                console.log(result);
                resolve(result);
              });
          }catch(e){
            console.log(e);
          }

        });
      });
    }

}

ProductReviewService.$inject = ['dbSchema'];
