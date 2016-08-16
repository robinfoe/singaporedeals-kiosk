class ProductDetailModalController{
  constructor($scope, $uibModalInstance , item){
    this.$scope = $scope;
    this.$uibModalInstance = $uibModalInstance;
    this.$scope.item = item;

    $scope.dismiss = () => {
    	$uibModalInstance.dismiss('cancel');
    };

  }
}


ProductDetailModalController.$inject=['$scope','$uibModalInstance', 'item'];
export default ProductDetailModalController;
