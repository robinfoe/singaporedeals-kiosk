var _ = require('underscore');

export default class CartService {
    constructor() {
      this.items = [];
    }

    getItems(){return this.items;}
    cloneCarts(){
      var carts = [];
      this.items.forEach( (item) => {
        carts.push(item.clone());
      })
      return carts;
    }
    

    addItem(cartItem){
      cartItem = cartItem.clone();
      var index = _.findIndex(this.items , (item) => { return item.product.id == cartItem.product.id;} );
      if(index == -1)
        this.items.push(cartItem);
      else
        this.items[index] = cartItem;
    }

    getGrandTotal(){
      var price = 0;
      this.items.forEach( (item) => {price += item.totalPrice;}  );
      return price;
    }


    findOrCreate(product){
      var cart = _.find(this.items , (item) => {
        return item.product.id == product.id;
      });

      if(cart)
        cart = cart.clone();
      
      return (!cart) ? this.createCartItem(product) : cart;
    }

    

    createCartItem(product){
      var cart = new CartItem(product);
      cart.initiatePrice();
      cart.computeTotal();
      return cart;
    }

    clearCart(){
      this.items = [];
    }

    removeItem(cartItem){
      var index = _.findIndex(this.items , (item) => { return item.product.id == cartItem.product.id });  
      if(index >= 0)
        this.items.splice(index, 1); 
    }

    isCartEmpty(){return this.items.length == 0;}

    isProductExist(product){
      var cart = _.find(this.items , (item) => {
        return item.product.id == product.id;
      });
      return (cart) ? true : false;
    }

    isPhysicalTicketExist(){
      var cart = _.find(this.items , (item) => {
        return item.deliveryOption == "Physical Ticket";
      });
      return (cart) ? true : false;
    }

    getEarliestDeliveryDate(){
      var itemToValidates = _.filter( this.items , (item) => {
        if(item.deliveryOption == "Physical Ticket"){
          if(item.tourDateTime.date && item.tourDateTime.time)
            return true;
        }
        return false;
      });

      var earliestItem = _.sortBy(itemToValidates , (item) => {
        var tmpTime = moment(item.tourDateTime.date + " " + item.tourDateTime.time, "lll");
        return tmpTime.valueOf();
      });

      return (earliestItem.length > 0) ? moment(earliestItem[0].tourDateTime.date + " " + earliestItem[0].tourDateTime.time, "lll") : moment();
    }
    
}




class CartItem {
  constructor(product){
    this.product = product;
    this.adult = {
      price : 0.00,
      count : 1,
      totalPrice : 0.00,
      isPromo : false
    }

    this.child = {
      price : 0.00, 
      count : 0,
      totalPrice : 0.00,
      isPromo : false 
    }

    this.totalPrice = 0.00;
    this.additionalServices = [];
    this.deliveryOption= null;
    this.tourDateTime = {
      date : null,
      time : null
    }
    
  }

  clone(){
    var cloned = new CartItem(this.product);
    cloned.totalPrice = this.totalPrice;
    cloned.deliveryOption = this.deliveryOption;

    this.additionalServices.forEach( (item) => {cloned.additionalServices.push(item)} );

    cloned.tourDateTime.date = this.tourDateTime.date;
    cloned.tourDateTime.time = this.tourDateTime.time;


    cloned.adult.price = this.adult.price;
    cloned.adult.count = this.adult.count;
    cloned.adult.totalPrice = this.adult.totalPrice;
    cloned.adult.isPromo = this.adult.isPromo;

    cloned.child.price = this.child.price;
    cloned.child.count = this.child.count;
    cloned.child.totalPrice = this.child.totalPrice;
    cloned.child.isPromo = this.child.isPromo;

    return cloned;
  }

  initiatePrice(){
    this.adult.price = this.product.adult_price;
    if(this.product.promo_adult_price > 0){
      this.adult.price = this.product.promo_adult_price;
      this.adult.isPromo = true;
    }

    this.child.price = this.product.child_price;
    if(this.product.promo_child_price > 0){
      this.child.price = this.product.promo_child_price;
      this.child.isPromo = true;
    }
  }


  computeTotal(){
    this.adult.totalPrice = this.adult.price * this.adult.count;
    this.child.totalPrice = this.child.price * this.child.count;
    this.totalPrice = this.adult.totalPrice + this.child.totalPrice;

    this.additionalServices.forEach( (service) =>{
      this.totalPrice += service.price;
    });

  }

  addAdult(){
    this.adult.count++;
    computeTotal();
  }

  removeAdult(){
    this.adult.count--;
    computeTotal();
  }

  addChild(){
    this.child.count++;
    computeTotal();
  }
  
  removeChild(){
    this.child.count--;
    computeTotal();
  }

} 


//CartService.$inject = ['dbSchema'];
