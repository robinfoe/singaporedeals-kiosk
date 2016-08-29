import WEBUTIL from '../lib/util/WebUtil'

class BookingController{
  constructor($scope, $rootScope, $timeout , sharedParamService,cartService ){
    this.$scope = $scope
    this.$scope.message = 'Booking Page';
    this.cartService = cartService;
    this.$rootScope = $rootScope;
    this.sharedParamService = sharedParamService;
    this.$scope.productExist = cartService.isProductExist(sharedParamService.getParameter());
    this.$scope.bookItem = cartService.findOrCreate(sharedParamService.getParameter());

    this.$scope.refreshCount = () => {
        $timeout(() => {
            this.$scope.bookItem.computeTotal();
        }); 
    };

    this.$scope.getCartLabel = () => {
      return (this.$scope.productExist) ? 'UPDATE CART' : 'ADD TO CART';
    };
  }


  addToCart(){
    this.cartService.addItem(this.$scope.bookItem);
    this.$scope.productExist = true;
    this.$rootScope.$broadcast(WEBUTIL.EVENT.CART_CHANGED);
  }

}

BookingController.$inject=['$scope' , '$rootScope','$timeout','sharedParamService','cartService'];
export default BookingController;