var _ = require('underscore');

class HomeController{
  constructor($scope, productService){
    this.$scope = $scope;
    this.productService = productService;
    this.$scope.message = 'Home Page';
    this.$scope.pagination = {
        rowPerPage : 8,
        totalRecord : 0,
        currentPage : 1,
        totalPage : 0,
        searchFilter : [
                  {name : 'is_deleted' , value : 'N'},
                  {name : 'is_active' , value : 'Y'},
                  {name : 'is_feature' , value : 'Y'}
                ],
        order : []
    }

    //this.$scope.nextPage = () => {this.nextPage();}
    //this.$scope.prevPage = () => {this.prevPage();}
    this.paginate();
  }

  paginate(){
    

    this.productService.paginateCount(this.$scope.pagination).then( (result) => {
      this.$scope.pagination.totalRecord = result;
      this.$scope.pagination.totalPage = Math.round(result / this.$scope.pagination.rowPerPage);

      this.productService.paginate(this.$scope.pagination).then( (records) => {
        var items = records.items;
        items.forEach( (item) => {
          item.review = _.find(records.itemsReview , (val) => {return item.id === val.PRODUCT_ID;});
        });
        //console.log(items);
      // this.$scope.items  = [];
        //var blocks = [];
        //var count = 0 ;

        var lists = _.chain(items).groupBy( (element,index) => {return Math.floor(index/4);} ).toArray().value();
        var blocks = _.chain(lists).groupBy( (element,index) =>{ return Math.floor(index/2);}  ).toArray().value();
        this.$scope.items = blocks;
        this.$scope.displayWidth =  (this.$scope.items.length * 1130) + "px" ;


       /*
         var lists = _.chain(items).groupBy(
                    function(element, index){ 
                      return Math.floor(index/8);
          }).toArray()
        .value();
          console.log('chaininig... ')
        console.log(lists);
        console.log(blocks);

       */
        
       // lists.forEach()


        

        
        



        //this.$scope.items = items;
        this.$scope.$apply();
      });

    });
  }

  nextPage(){
    if(this.$scope.pagination.currentPage >= this.$scope.pagination.totalPage )
      return;

    this.$scope.pagination.currentPage++;
    this.paginate();
  }

  prevPage(){
    if(this.$scope.pagination.currentPage <= 1 )
      return;

    this.$scope.pagination.currentPage--;
    this.paginate();
  }

}
HomeController.$inject=['$scope','productService'];
export default HomeController;
