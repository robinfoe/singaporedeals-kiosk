class ProductController{
  constructor($scope){
    this.$scope = $scope
    this.$scope.message = 'Product Page';
  }
}


ProductController.$inject=['$scope'];
export default ProductController;
