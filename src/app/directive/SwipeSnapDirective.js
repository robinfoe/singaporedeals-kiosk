import hammerjs from 'hammerjs'

export default class SwipeSnapDirective {
    constructor() {
        this.restrict = 'AE';
    }

    link(scope, element, attrs){

      var snapLocations = JSON.parse(attrs.snapLocations),
      restPosition = 0, // Define the location to end.
      positionX = 0; // The current position.



      hammerjs(element[0]).on('panstart', (ev) => {element.removeClass('animate');} );

      hammerjs(element[0]).on('panmove', (ev) => {
        positionX = restPosition + parseInt(ev.deltaX);
        element.css('-webkit-transform', 'translate3d(' + positionX + 'px,0px,0px)');
        element.css('transform', 'translate3d(' + positionX + 'px,0px,0px)');

      });

      hammerjs(element[0]).on('panend', (ev) => {
        element.addClass('animate');
        restPosition = this.calculateSnapPosition(positionX, snapLocations);
        element.css('-webkit-transform', 'translate3d(' + restPosition + 'px, 0px, 0px)');
      } );

    }

    calculateSnapPosition(positionX, snapLocations){
      // Used to store each difference between current position and each snap point.
      var currentDiff;
      // Used to store the current best difference.
      var minimumDiff;
      // User to store the best snap position.
      var bestSnap;

      // We're going to cycle through each snap location
      // and work out which is closest to the current position.
      for (var i=0; i < snapLocations.length; i++) {
        // Calculate the difference.
        currentDiff = Math.abs(positionX - snapLocations[i]);
        // Works out if this difference is the closest yet.
        if(minimumDiff === undefined || currentDiff < minimumDiff) {
          minimumDiff = currentDiff;
          bestSnap = snapLocations[i];
        }
      }
      return bestSnap;
    }



}
