import WEBUTIL from '../lib/util/WebUtil'
import OrderFormEntity from '../entity/OrderFormEntity.js';

var _ = require('underscore');
class CheckOutController{
  constructor($scope, $rootScope, $timeout,cartService ){
    this.$scope = $scope
    this.cartService = cartService;
    this.$rootScope = $rootScope;
    this.$scope.orderForm = new OrderFormEntity();

    this.generateWizards(); 
    this.proceedStep(WEBUTIL.CHECKOUT_STATE.HOTEL_DETAIL);  
  }

  generateWizards(){
  	var steps = [];
  	steps.push({name : 'Hotel Detail', code: WEBUTIL.CHECKOUT_STATE.HOTEL_DETAIL , class : '' , view : './partial/check-out-hotel.html'});
  	if(this.cartService.isPhysicalTicketExist())
  		steps.push({name : 'Delivery Time', code:WEBUTIL.CHECKOUT_STATE.DELIVERY_TIME , class : '' , view : './partial/check-out-delivery.html' });
  	
  	steps.push({name : 'Payment Detail', code:WEBUTIL.CHECKOUT_STATE.PAYMENT_DETAIL , class : '' , view : './partial/check-out-payment.html'});
  	this.$scope.steps = steps;
  }


  proceedStep(code){
  	this.$scope.steps.forEach( (step) => {
  		step.class='';
  		if(step.code == code){
  			this.$scope.currentStep = step;
  			step.class = 'stepwizard-progress';
  		}	
  	});
  }

  next(){
  	var index = _.findIndex(this.$scope.steps , (step) => {
  		return step.code == this.$scope.currentStep.code;
  	});
  	if(index < (this.$scope.steps.length - 1)  )
  		this.proceedStep( this.$scope.steps[index+1].code );
  }

  previous(){
  	var index = _.findIndex(this.$scope.steps , (step) => {
  		return step.code == this.$scope.currentStep.code;
  	})
  	if(index > 0  )
  		this.proceedStep( this.$scope.steps[index - 1].code );

  }


}

CheckOutController.$inject=['$scope' , '$rootScope','$timeout','cartService'];
export default CheckOutController;