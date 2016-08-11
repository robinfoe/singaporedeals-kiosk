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
    //console.log(_.unescape('Curly, Larry &amp; Moe'));
    //console.log(_.unescape('Curly, Larry &amp; Moe &trade; &#8482; &#x02122; &#8482; &#x2122; ™'));
    this.productService.paginateCount(this.$scope.pagination).then( (result) => {
      this.$scope.pagination.totalRecord = result;
      this.$scope.pagination.totalPage = Math.round(result / this.$scope.pagination.rowPerPage);

      this.productService.paginate(this.$scope.pagination).then( (records) => {
        var items = records.items;
        items.forEach( (item) => {
          item.review = _.find(records.itemsReview , (val) => {return item.id === val.PRODUCT_ID;})
        });
        console.log(items);
        this.$scope.items = items;
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
