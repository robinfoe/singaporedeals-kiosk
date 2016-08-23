class CartController{
  constructor($scope,cartService){
    this.$scope = $scope
    this.cartService = cartService;

    $scope.count = () => {
    	return this.cartService.items.length;
    };

    $scope.getCarts = () => {
    	return this.cartService.items;
    };

    $scope.getGrandTotal = () => {return this.cartService.getGrandTotal();};

    $scope.goToCart = (cartItem) => {
    	console.log(cartItem);
    };
  }
}

CartController.$inject=['$scope','cartService'];
export default CartController;