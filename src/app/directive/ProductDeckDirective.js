import WEBUTIL from '../lib/util/WebUtil'

export default class ProductDeckDirective {
    constructor() {
        this.templateUrl = './directive/product-deck.html';
        this.restrict = 'E';
        this.scope = { item : '=item'};
    }

    link(scope, element, attrs){
      scope.showFeature = function(item){
        var styles = ['ribbon'];
        if(!WEBUTIL.isStringEmpty(item.feature))
          styles.push( (item.feature.toLowerCase()).replace(' ','_')   );

        return styles.join(' ');
      }
    }

}
