import hammerjs from 'hammerjs'

export default class SwipeSnapDirective {
    constructor() {
        this.restrict = 'E';
    }

    link(scope, element, attrs){

      var snapLocations = JSON.parse(attr.snapLocations),
      restPosition = 0, // Define the location to end.
      positionX = 0; // The current position.



      /**
      * Perform any setup for the drag actions.
      */
      hammerjs(element[0]).on("dragstart", function(ev) {

        // We dont want an animation delay when dragging.
        element.removeClass('animate');
      });

      /**
      * Follow the drag position when the user is interacting.
      */
      hammerjs(element[0]).on("drag", function(ev) {

        // Set the current position.
        positionX = restPosition + parseInt(ev.gesture.deltaX);

        element.css('-webkit-transform', 'translate3d(' + positionX + 'px,0px,0px)');
        element.css('transform', 'translate3d(' + positionX + 'px,0px,0px)');
      });

      /**
      * The drag is finishing so we'll animate to a snap point.
      */
      hammerjs(element[0]).on("dragend", function(ev) {
        element.addClass('animate');

        // Work out where we should "snap" to.
        restPosition = this.calculate_snap_location(positionX);

        element.css('-webkit-transform', 'translate3d(' + restPosition + 'px, 0px, 0px)');
      });

    }

    calculateSnapPosition(position){
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
