class BookingController{
  constructor($scope, $timeout , sharedParamService,cartService){
    this.$scope = $scope
    this.$scope.message = 'Booking Page';
    this.cartService = cartService;
    this.sharedParamService = sharedParamService;
    this.$scope.bookItem = cartService.findOrCreate(sharedParamService.getParameter());

    this.$scope.refreshCount = () => {
        $timeout(() => {
            this.$scope.bookItem.computeTotal();
        }); 
    };



    
  }




  addToCart(){
    console.log(this.$scope.bookItem);
    this.cartService.addItem(this.$scope.bookItem);
    // TODO :: logic to add to cart..... 
  }



}

BookingController.$inject=['$scope','$timeout','sharedParamService','cartService'];
export default BookingController;