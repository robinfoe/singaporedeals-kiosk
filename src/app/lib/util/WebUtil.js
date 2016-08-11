
class WebUtil{
  constructor(){}

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
