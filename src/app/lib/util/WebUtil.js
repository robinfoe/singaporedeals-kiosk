
class WebUtil{
  constructor(){
    this.EVENT = {
      CART_CHANGED : 'CARTC'
    };

    this.CHECKOUT_STATE = {
      HOTEL_DETAIL : 'HD',
      PAYMENT_DETAIL : 'PD',
      DELIVERY_TIME : 'DT'
    }

  }

  isStringEmpty(text){
    return (!text || 0 === text.length)
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
