class BookingController{
  constructor($scope, sharedParamService,cartService){
    this.$scope = $scope
    this.$scope.message = 'Booking Page';
    this.cartService = cartService;
    this.sharedParamService = sharedParamService;
    this.$scope.bookItem = {
    	product : sharedParamService.getParameter(),
    	adult : 1,
    	child : 0,
    	additionalServices : 0,
    	deliveryOption : null
    }

  }

  getTotalPrice(){
    var total = 0;
    total += this.$scope.bookItem.adult * this.$scope.bookItem.adult_price;
    total += this.$scope.bookItem.child * this.$scope.bookItem.child_price;
    return total;
  }

  addToCart(){
    // TODO :: logic to add to cart..... 
  }



}


BookingController.$inject=['$scope','sharedParamService','cartService'];
export default BookingController;