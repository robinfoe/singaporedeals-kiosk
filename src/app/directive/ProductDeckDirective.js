import WEBUTIL from '../lib/util/WebUtil'

export default class ProductDeckDirective {
    constructor($uibModal, sharedParamService , $location) {
        this.templateUrl = './directive/product-deck.html';
        this.restrict = 'E';
        this.scope = { item : '=item'};
        this.$uibModal = $uibModal;
        this.sharedParamService = sharedParamService;
        this.$location = $location;
    }

    link(scope, element, attrs){
      scope.showFeature = function(item){
        var styles = ['ribbon'];
        if(!WEBUTIL.isStringEmpty(item.feature))
          styles.push( (item.feature.toLowerCase()).replace(' ','_')   );

        return styles.join(' ');
      };


      scope.showDetails = (item) => {
        var modalInstance = this.$uibModal.open({
          animation: true,
          templateUrl: './partial/product-detail.html',
          size : 'lg',
          controller: 'ProductDetailModalController',
          resolve: {
            item: function () {
              return item;
            }
          }
        });
      };

      scope.proceedBooking = (item) =>{
        this.sharedParamService.setParameter(item);
        this.$location.path('/book');
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
