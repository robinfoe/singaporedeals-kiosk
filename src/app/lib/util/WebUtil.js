var _ = require('underscore');

class WebUtil{
  constructor(){
    this.EVENT = {
      CART_CHANGED : 'CARTC'
    };

    this.CHECKOUT_STATE = {
      HOTEL_DETAIL : 'HD',
      PAYMENT_DETAIL : 'PD',
      DELIVERY_TIME : 'DT'
    };

    this.CARD_TYPES = [
      /*
      {card : 'electron', regex : /^(4026|417500|4405|4508|4844|4913|4917)\d+$/ , class: 'fa fa-credit-card' , inputEnable : true },
      {card : 'maestro', regex : /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/, class: 'fa fa-credit-card' , inputEnable : true },
      {card : 'dankort', regex: /^(5019)\d+$/ ,  class: 'fa fa-credit-card' , inputEnable : true },
      {card : 'interpayment' , regex: /^(636)\d+$/ , class: 'fa fa-credit-card' , inputEnable : true },
      {card : 'unionpay', regex: /^(62|88)\d+$/ , class: 'fa fa-credit-card' , inputEnable : true },
      */
      {card : 'Visa' , regex: /^4[0-9]{12}(?:[0-9]{3})?$/ , class: 'fa fa-cc-visa' , disabled:true },
      {card : 'Master Card' , regex: /^5[1-5][0-9]{14}$/ , class: 'fa fa-cc-mastercard', disabled:true },
      {card : 'Amex', regex: /^3[47][0-9]{13}$/ , class: 'fa fa-cc-amex' , disabled:true},
      {card : 'Discover' , regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/ , class: 'fa fa-cc-discover' , disabled:true},
      //{card : 'Diners', regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/ , class: 'fa fa-cc-diners-club' , inputEnable:false},
      //{card : 'JCB' , regex: /^(?:2131|1800|35\d{3})\d{11}$/ , class: 'fa fa-cc-jcb' , inputEnable:false},
      {card : 'unknown', class: 'fa fa-credit-card' , disabled : false }
    ];

  }


  getCreditCartType(cardNumber){
    console.log(cardNumber);
    var cardType =   _.find(this.CARD_TYPES , (item) =>{
      if(item.regex)
        return item.regex.test(cardNumber);

      return false;
    });

    return (!cardType) ? this.getUnknownCardType() : cardType;
  }

  getUnknownCardType(){
    return _.find(this.CARD_TYPES , (item) =>{
      return item.card == 'unknown';
    });
  }

  isStringEmpty(text){
    return (!text || 0 === text.length)
  }

  isValidEmail(text){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
  }

  roundUp(value, decimalPoint){
    return (value) ?  Math.round(value) : 0;
  }

  isEticketAvailable(catId, deliveryOption){
    return (catId != 8) ? false : (deliveryOption == 2 || deliveryOption == 3);
  }








}

const WEBUTIL = new WebUtil();
export default WEBUTIL;
