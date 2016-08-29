import WEBUTIL from '../lib/util/WebUtil'

class CartPreviewController{
  constructor($scope,$location , $route , $timeout, $uibModal , cartService, sharedParamService){
    this.$scope = $scope
    this.cartService = cartService;
    this.$location = $location;
    this.sharedParamService = sharedParamService;
    this.$uibModal = $uibModal;

    $scope.refreshCount = (cartItem) => {
        $timeout(() => {
            cartItem.computeTotal();
        }); 
    };

    $scope.count = () => {
    	return this.cartService.items.length;
    };

    $scope.getCarts = () => {
    	return this.cartService.items;
    };

    $scope.getGrandTotal = () => {return this.cartService.getGrandTotal();};

  }

  removeItem(cartItem){
    this.cartService.removeItem(cartItem);
  }

  gotToCart(cartItem){
    this.sharedParamService.setParameter(cartItem.product);
    if(this.$location.url() === '/book')
        $route.reload();
    else
        this.$location.path('/book');
  } 

  isCartExist(){ return !this.cartService.isCartEmpty()}

  raiseService(cartItem){
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: './partial/product-service-selection.html',
      size : 'lg',
      controller: 'ProductServiceModalController',
      controllerAs : 'mvm',
      resolve: {
        cartItem: function () {
            console.log('creating cart item....');
          return cartItem.clone();
        }
      }
    });

    modalInstance.result.then( (item) => {
        this.cartService.addItem(item);
    });
  }


}

CartPreviewController.$inject=['$scope','$location','$route','$timeout','$uibModal','cartService','sharedParamService'];
export default CartPreviewController;