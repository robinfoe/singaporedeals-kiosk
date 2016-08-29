class ProductServiceModalController{
  constructor($scope, $uibModalInstance , cartItem){
    this.$scope = $scope;
    this.$uibModalInstance = $uibModalInstance;
    this.$scope.cartItem = cartItem;


  }

  dismiss(){
  	this.$uibModalInstance.dismiss('cancel');
  }

  submit(){
  	this.$uibModalInstance.close(this.$scope.cartItem);
  }

}


ProductServiceModalController.$inject=['$scope','$uibModalInstance', 'cartItem'];
export default ProductServiceModalController;
