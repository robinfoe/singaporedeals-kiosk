import WEBUTIL from '../lib/util/WebUtil'

export default class TouchSpinDirective {
    constructor() {
        this.templateUrl = './directive/touch-spin.html';
        this.restrict = 'AE';
        this.scope = { 
          quantity : '=quantity',
          min : '=min',
          max : '=max',
          callback : '&callback'
        };
    }

    link(scope, element, attrs){
      //console.log(scope);
      // upon link, check the value
      if((scope.min) &&  (scope.min > scope.quantity) )
        scope.quantity = scope.min;


      if((scope.max) &&  (scope.max < scope.quantity) )
        scope.quantity = scope.max;

      if(!scope.min)
          scope.min = 0;

      if(!scope.max)
          scope.max = 50;


      scope.increase = () => {
        if(scope.quantity == scope.max)
          return;
        
        scope.quantity++;
        if(scope.callback)
          scope.callback();
      };

      scope.decrease = () => {
        if(scope.quantity == scope.min)
          return;

        scope.quantity--;
        if(scope.callback)
          scope.callback();
      };
    }

}
