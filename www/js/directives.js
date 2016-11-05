angular.module('starter.directives', [])

.directive('map', function() {  // always written
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },


    link: function ($scope, $element, $attr,$ionicLoading) { // for initializing a map to set any ceneter and zoom 
      // choose type for the map 
      // add Listeners look to api to understand events and listeners 
      function initialize() {
        console.log("initialize");






        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          
       // center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
      

       google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
