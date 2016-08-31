import WEBUTIL from '../lib/util/WebUtil'

var _ = require('underscore');
export default class AvailableServiceDirective {
    constructor(productService) {
        this.template = '<div ng-include="getContentUrl()"></div>';
        this.restrict = 'AE';
        this.productService = productService;
        this.scope = { 
          cartItem : '=cartItem'
        };
    }

    link(scope, element, attrs){
      scope.getContentUrl = () => {
        return './directive/available-service-book-edit.html'
      };
      scope.isAvailable = false;
      scope.availableServices = [];

      scope.isServiceSelected = (service) => {
        var item = _.find( scope.cartItem.additionalServices  , (cartService) => {
          return cartService.id == service.id;
        });
        return (item) ? true : false;
      };

      scope.toggleService = (service) => {

        var index = _.findIndex( scope.cartItem.additionalServices  , (cartService) => {
          return cartService.id == service.id;
        });

        if(index >= 0 )
          scope.cartItem.additionalServices.splice(index,1);
        else
          scope.cartItem.additionalServices.push(service);

        scope.cartItem.computeTotal();
      };

      this.productService
              .getServiceByProduct(scope.cartItem.product)
              .then((resultSet) => {
                scope.availableServices = resultSet;
                if(resultSet && resultSet.length > 0)
                  scope.isAvailable = true; 
              });

    }

}
