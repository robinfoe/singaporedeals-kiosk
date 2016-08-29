export default class ShakeThatDirective {
    constructor($animate) {
        this.restrict = 'AE';
        this.$animate = $animate;
        this.scope={
          listen : "="
        }
    }

    link(scope, element, attrs){

      scope.$on(scope.listen,() => {

        this.$animate.addClass(element, 'animated wobble').then( () => {
          this.$animate.removeClass(element,'animated wobble');
        });
      });

    }
}
