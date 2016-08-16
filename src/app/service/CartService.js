export default class CartService {
    constructor() {
      this.items = [];
    }

    getItems(){
      return this.items;
    }

    addItem(cartItem){
      this.items.push(cartItem);
    }

    createCartItem(product){
      return new CartItem(product);
    }

    clearCart(){
      this.items = [];
    }
}




class CartItem {
  constructor(product){
    this.product = product;
    this.adult = 0.00;
    this.child = 0.00;
    this.totalPrice = 0.00;
    this.additionalServices = [];
  }

} 


//CartService.$inject = ['dbSchema'];
