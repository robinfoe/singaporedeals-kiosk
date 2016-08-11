
import Promise from 'promise';


export default class ProductService {
    constructor(dbSchema) {
      const lovefield = require('lovefield');
      this.lovefield = lovefield;
      this.dbSchema = dbSchema;
       //Schema.getConn().then(conn => {
        // this.prodTable = conn.getSchema().table('product');
       //});
		  //  this.$http = $http;
    }

    paginateCount(filter){
      return new Promise( (resolve,reject) => {
        this.dbSchema.getConn().then(conn => {
          try{
            var prodTable = conn.getSchema().table('product');

            var query = conn.select(lf.fn.count(prodTable.code)).from(prodTable);
            if(filter.searchFilter.length > 0 ){
              var parameters = [];
              filter.searchFilter.forEach((item) => {
                parameters.push( prodTable[item.name].eq(item.value)  );
              });
              query.where(lf.op.and.apply(this,parameters));
            }


            query.exec().then( (result) => {
              resolve(result[0]['COUNT(code)']);
            });

          }catch(e){
            console.log(e);
          }
        });
      });
    }

    paginate(filter){

      return new Promise( (resolve , reject) => {
        this.dbSchema.getConn().then(conn => {

          try{
              var limit = filter.rowPerPage;
              var skip = (filter.currentPage -1 ) * limit;
              var prodTable = conn.getSchema().table('product');
              var query = conn.select().from(prodTable);
              if(filter.searchFilter.length > 0 ){
                var parameters = [];
                filter.searchFilter.forEach((item) => {
                  parameters.push( prodTable[item.name].eq(item.value)  );
                });
                query.where(lf.op.and.apply(this,parameters));
              }

              query.skip(skip)
                .limit(limit)
                .orderBy(prodTable.sort_order , lf.Order.ASC)
                .exec()
                .then( (result) => {

                    var productIds = [];
                    result.forEach( (item) => {productIds.push(item.id)});
                    var reviewTable = conn.getSchema().table('reviews');
                    conn.select(reviewTable.product_id.as('PRODUCT_ID'),
                            lf.fn.count().as('REVIEW_COUNT') ,
                            lf.fn.sum(reviewTable.review_overall).as('REVIEW_SCORE') )
                    .from(reviewTable)
                    .where(reviewTable.product_id.in(productIds))
                    .groupBy(reviewTable.product_id)
                    .exec().then( (reviewResult) => {
                      resolve({items : result , itemsReview : reviewResult});
                    });

                });
          }catch(e){
            console.log(e);
          }

        });

      });



    }


	// Example service function
	//getData () {
	//	return this.$http({method: 'GET', url: './api' });
	//}
}

ProductService.$inject = ['dbSchema'];
