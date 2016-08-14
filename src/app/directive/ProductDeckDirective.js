import WEBUTIL from '../lib/util/WebUtil'

export default class ProductDeckDirective {
    constructor($uibModal) {
        this.templateUrl = './directive/product-deck.html';
        this.restrict = 'E';
        this.scope = { item : '=item'};
        console.log($uibModal);
        this.$uibModal = $uibModal;
    }

    link(scope, element, attrs){
      scope.showFeature = function(item){
        var styles = ['ribbon'];
        if(!WEBUTIL.isStringEmpty(item.feature))
          styles.push( (item.feature.toLowerCase()).replace(' ','_')   );

        return styles.join(' ');
      };


      scope.showDetails = (item) => {
        console.log(item);
        console.log("clicked");
        var modalInstance = this.$uibModal.open({
          animation: true,
          templateUrl: './partial/product-detail.html',
          resolve: {
            items: function () {
              return scope.items;
            }
          }
      });

      };


/*

      scope.showDetails = function(item){
        console.log(item);
        console.log("clicked");

        console.log(this.$uibModal)
        var modalInstance = this.$uibModal.open({
        templateUrl: './partial/product-detail.html',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      }

*/



    }

}
