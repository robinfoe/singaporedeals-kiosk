var _ = require('underscore');

export default class CartService {
    constructor() {
      this.items = [];
    }

    getItems(){return this.items;}

    addItem(cartItem){
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
