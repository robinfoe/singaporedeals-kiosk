import WEBUTIL from '../lib/util/WebUtil'
import OrderFormEntity from '../entity/OrderFormEntity.js';

var _ = require('underscore');
class CheckOutController{
  constructor($scope, $rootScope, $route , $location,$timeout,growl,cartService ){
    this.$scope = $scope;
    this.$location = $location;
    this.$route = $route;
    this.cartService = cartService;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.growl = growl;
    this.$scope.orderForm = new OrderFormEntity();
    this.$scope.cardTypes = WEBUTIL.CARD_TYPES;
    this.$scope.data = {
      card : {minDate : moment().format("MMMM YYYY")}
    };

    this.generateWizards(); 
    this.proceedStep(WEBUTIL.CHECKOUT_STATE.HOTEL_DETAIL);  
    this.generateDeliveryOption();


  }

  generateWizards(){
  	var steps = [];
  	steps.push({name : 'Hotel Detail', code: WEBUTIL.CHECKOUT_STATE.HOTEL_DETAIL , class : '' , view : './partial/check-out-hotel.html', onchange : 'validateHotelDetail'});
  	if(this.cartService.isPhysicalTicketExist())
  		steps.push({name : 'Delivery Time', code:WEBUTIL.CHECKOUT_STATE.DELIVERY_TIME , class : '' , view : './partial/check-out-delivery.html', onchange : 'validateDeliveryTime' });
  	
  	steps.push({name : 'Payment Detail', code:WEBUTIL.CHECKOUT_STATE.PAYMENT_DETAIL , class : '' , view : './partial/check-out-payment.html', onchange : 'validatePaymentDetail', onload : 'onloadPaymentDetail'});
  	this.$scope.steps = steps;
  }

  onChange(newValue, oldValue){
    this.$timeout(() => {this.generateDeliveryOption()});
  }

  generateDeliveryOption(){

    var availableTimings = [ {value : '08:30 AM' , label:'08:30am to 09:00am'  , disabled : false} , 
                              {value : '12:00 PM' , label:'12:00pm to 12:30pm' , disabled : false},
                              {value : '06:00 PM' , label:'06:00pm to 06:30pm' , disabled : false},
                              {value : '11:30 PM' , label:'11:30pm to 12:00am' , disabled : false}
                            ];

    var cutoffDateTime = this.cartService.getEarliestDeliveryDate();
    var currentDate = moment();

    if(currentDate.isAfter(cutoffDateTime))
      currentDate = cutoffDateTime;


    this.$scope.minDate = currentDate.format('ll');
    var currentSelected = this.$scope.orderForm.deliveryDate;

    if(!currentSelected)
      currentSelected = currentDate.format('ll');

    var now = moment();
    now.add(120,'m'); // add 120 minutes from now ... need 2 hour in advance before delivery....

    availableTimings.forEach( (availableTime) => {
      var compareDate = moment( currentSelected + " " + availableTime.value , 'lll');
      availableTime.disabled = now.isAfter(compareDate);
    });


    var enableExists = _.filter( availableTimings , (time) => {return !time.disabled;});
    if(enableExists.length == 0){
      availableTimings.forEach( (availableTime) => {availableTime.disabled = false;});
      currentSelected.add(1,'d'); //add in 1 day
    }


    this.$scope.orderForm.deliveryDate = currentSelected;
    this.$scope.availableTimings = availableTimings;
    enableExists = _.filter( availableTimings , (time) => {return !time.disabled;});
    var timeExist = _.find(enableExists, (time) => {time.value == this.$scope.orderForm.deliveryTime;})

    if(!timeExist)
      this.assignDeliveryTime(enableExists[0]);
  } 
    

  assignDeliveryType(val){
    this.$scope.orderForm.deliveryType = val;
  }

  assignDeliveryTime(time){
    if(!time.disabled)
      this.$scope.orderForm.deliveryTime = time.value;
  }

  assignPaymentMethod(type){
    this.$scope.orderForm.payment.method=type;
  }

  submitOrder(){
    var payment = this.$scope.orderForm.payment;
    var errors = [];
    if(this.$scope.orderForm.isPaymentCreditCart()){

      if(WEBUTIL.isStringEmpty(payment.cardInfo.number))
        errors.push('Please enter Credit Card Number');
      else if(payment.cardInfo.number.length < 16)
        errors.push('Invalid Credic card number');

      if(WEBUTIL.isStringEmpty(payment.cardInfo.type))
        errors.push('Please enter Credit Cart Type');

      if(WEBUTIL.isStringEmpty(payment.cardInfo.cvv2))
        errors.push('Please enter CVV / CVV2');

      if(WEBUTIL.isStringEmpty(payment.cardInfo.name))
        errors.push('Please enter Name');


      //expiryMonthYear
      var expiryDate = moment(payment.cardInfo.expiryMonthYear,"MMMM YYYY");
      payment.cardInfo.expireMonth = expiryDate.format("M");
      payment.cardInfo.expireYear = expiryDate.format("YYYY")

    }



    if(errors.length > 0){
      var messages = "<ul class='message-bullet'><li>"+ errors.join('</li><li>')+"</li></ul>";
      this.growl.error(messages);
    }else{
      this.$scope.orderForm.carts = this.cartService.cloneCarts();
      this.cartService.clearCart();
      this.growl.info("<ul class='message-bullet'><li>Thank you for your Order </li></ul>");
      console.log(this.$scope.orderForm);
      this.$location.path('/home');
    }
  
  }

  proceedStep(code){

    var index = 1;
  	this.$scope.steps.forEach( (step) => {
  		step.class='';
  		if(step.code == code){
        if(step.onload)
          this[step.onload]();

        this.$scope.currentPage = index;
  			this.$scope.currentStep = step;
  			step.class = 'stepwizard-progress';
  		}	
      index++;
  	});
  }

  

  next(){
  	var index = _.findIndex(this.$scope.steps , (step) => {
  		return step.code == this.$scope.currentStep.code;
  	});

  	if(index < (this.$scope.steps.length - 1)  )
      this[this.$scope.currentStep.onchange](this.$scope.steps[index+1].code );
  		//this.proceedStep( this.$scope.steps[index+1].code );
  }

  previous(){
  	var index = _.findIndex(this.$scope.steps , (step) => {
  		return step.code == this.$scope.currentStep.code;
  	})
  	if(index > 0  )
  		this.proceedStep( this.$scope.steps[index - 1].code );

  }

  onloadPaymentDetail(){
    if(WEBUTIL.isStringEmpty(this.$scope.orderForm.payment.cardInfo.name))
      this.$scope.orderForm.payment.cardInfo.name = this.$scope.orderForm.hotelDetail.firstName + " " + this.$scope.orderForm.hotelDetail.lastName
  }

  validateHotelDetail(nextCode){
    //console.log('validateHotelDetail');
    var errors = [];
    var hotelDetail = this.$scope.orderForm.hotelDetail;
    if(WEBUTIL.isStringEmpty(hotelDetail.firstName))
      errors.push('Please enter first name');

    if(WEBUTIL.isStringEmpty(hotelDetail.lastName))
      errors.push('Please enter last name');

    if(WEBUTIL.isStringEmpty(hotelDetail.roomNumber))
      errors.push('Please enter room number');

    if(WEBUTIL.isStringEmpty(hotelDetail.email))
      errors.push('Please enter email');
    else if(!WEBUTIL.isValidEmail(hotelDetail.email)){
      errors.push('Please enter valid email address');
    }

    if(errors.length > 0){
      var messages = "<ul class='message-bullet'><li>"+ errors.join('</li><li>')+"</li></ul>";
      this.growl.error(messages);
    }else
      this.proceedStep(nextCode);
  }

  validateDeliveryTime(nextCode){
    this.proceedStep(nextCode);
  }

  validatePaymentDetail(nextCode){

    // TODO :: submission...
    //this.proceedStep(nextCode);
  }


  decideCardType(){
    var cardInfo = this.$scope.orderForm.payment.cardInfo;
    var cardType = WEBUTIL.getCreditCartType(cardInfo.number);
    this.$scope.orderForm.setCardType(cardType);
  }



}

CheckOutController.$inject=['$scope' , '$rootScope', '$route','$location', '$timeout','growl','cartService'];
export default CheckOutController;