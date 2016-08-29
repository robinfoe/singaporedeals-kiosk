import WEBUTIL from '../lib/util/WebUtil'

class CartController{
  constructor($scope,$location , $route , cartService, sharedParamService){
    this.$scope = $scope
    this.cartService = cartService;
    this.$location = $location;
    this.sharedParamService = sharedParamService;

    $scope.count = () => {
    	return this.cartService.items.length;
    };

    $scope.getCarts = () => {
    	return this.cartService.items;
    };

    $scope.getGrandTotal = () => {return this.cartService.getGrandTotal();};

    $scope.goToCart = (cartItem) => {
    	this.sharedParamService.setParameter(cartItem.product);
        
        if(this.$location.url() === '/book')
            $route.reload();
        else
            this.$location.path('/book');
    };

    $scope.clearCart = () => {
        this.cartService.clearCart();
        this.$location.path('/home');

    }; 

  }
}

CartController.$inject=['$scope','$location','$route','cartService','sharedParamService'];
export default CartController;