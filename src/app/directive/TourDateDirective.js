import WEBUTIL from '../lib/util/WebUtil'
var _ = require('underscore');

export default class TourDateDirective {
    constructor() {
        this.template = '<div ng-include="getContentUrl()"></div>';
        //this.templateUrl = './directive/tour-date-book-edit.html';
        this.restrict = 'AE';
        this.scope = { 
          cartItem : '=cartItem'
        };
    }

    link(scope, element, attrs){
      scope.isAvailable = () => {return scope.cartItem.product.date_mandatory == 1;};
      //scope.currentDate = new Date();
      var availableTimes = scope.cartItem.product.time.split(',');
      availableTimes.sort( (lhs,rhs) => { new Date('1970/01/01 ' + lhs) - new Date('1970/01/01 ' + rhs); });
      scope.getContentUrl = () => {
        return './directive/tour-date-book-edit.html'
      };

      if(!scope.cartItem.tourDateTime.date)
        scope.cartItem.tourDateTime.date = moment().format('ll');


      scope.onChange = (newValue, oldValue) => {
        scope.decideTime();
      };


      scope.availableTimes = [];
      scope.decideTime = () => {
        scope.availableTimes = [];
        let decided = false;
        var dateToCompare = moment();
        var currentDate = moment(scope.cartItem.tourDateTime.date, "ll");

        if(currentDate.isSame(dateToCompare,'day')){

          availableTimes.forEach( (time) => {
            var tmpTime = moment(dateToCompare.format("ll") + " " + time, "lll");
            (tmpTime).subtract(15,'minutes'); // buffer out 15 minutes... 
            if(dateToCompare.isBefore(tmpTime))
              scope.availableTimes.push(tmpTime);
          });

          if(scope.availableTimes.length == 0){
            currentDate.add(1, 'days')
            scope.cartItem.tourDateTime.date = currentDate.format('ll');
          }

          scope.minDate = scope.cartItem.tourDateTime.date;
        }

        scope.availableTimes = availableTimes;
        if( ! _.contains(scope.availableTimes , scope.cartItem.tourDateTime.time) )
          scope.cartItem.tourDateTime.time = scope.availableTimes[0];

      };

     

      scope.decideTime();
    }

}
