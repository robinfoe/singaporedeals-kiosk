import WEBUTIL from '../lib/util/WebUtil'
var _ = require('underscore');

export default class DeliveryOptionDirective {
    constructor() {
        this.template = '<div ng-include="getContentUrl()"></div>';
        //this.templateUrl = './directive/delivery-option-book-edit.html';
        this.restrict = 'AE';
        this.scope = { 
          cartItem : '=cartItem'
        };
    }

    link(scope, element, attrs){

      scope.isActualTicket = () => {return scope.cartItem.product.delivery_option == 'AT';}; // AT actual Ticket
      scope.getContentUrl = () => {
        return './directive/delivery-option-book-edit.html'
      };

      scope.assign = (item) => {scope.cartItem.deliveryOption = item;};

      var availableDeliveries = ['Physical Ticket' , 'E-Ticket'];
      if(scope.cartItem.product.d_option == 1)
        availableDeliveries = ['Physical Ticket']

      if(scope.cartItem.product.d_option == 2)
        availableDeliveries = ['E-Ticket']

      if(scope.cartItem.product.delivery_option == 'EC') // EC Electronic Confirmation, will only receive email notification without barcode or booking code
        availableDeliveries = ['E-Confirmation'];


      scope.availableDeliveries = availableDeliveries;

      if(!scope.cartItem.deliveryOption)
        scope.cartItem.deliveryOption = scope.availableDeliveries[0];
      
    }
}
