class CartController{
  constructor($scope,cartService){
    this.$scope = $scope
    this.cartService = cartService;

    $scope.count = () => {
    	return this.cartService.items.length;
    };
  }
}

CartController.$inject=['$scope','cartService'];
export default CartController;