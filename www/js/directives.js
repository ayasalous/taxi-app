angular.module('starter.directives', [])

.directive('map', function() {  // always written
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },


    link: function ($scope, $element, $attr,$ionicLoading,$rootScope) { // for initializing a map to set any ceneter and zoom 
      // choose type for the map 
      // add Listeners look to api to understand events and listeners 
      function initialize() {

//        console.log("at begin of directives "+$rootScope.lati,$rootScope.long);


      console.log("initialize");
      //console.log( $rootScope.long);
      //console.log($rootScope.lati);
        //console.log({{aya}});
        var mapOptions = {
        center: new google.maps.LatLng(43.07493, -89.381388),//***the first location you see in map***\\
          
       // center: new google.maps.LatLng($rootScope.lati, $rootScope.long),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
  

////////////////////////////// Drow Line ////////////////////////////
  var flightPlanCoordinates = [
        {lat: 32.2197215, lng: 35.2755521},
          //// {lat: $rootScope.tracking.lati,lng:$rootScope.tracking.long},
          {lat:31.76832, lng: 35.21371}
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);



////////////////////////////// Drow Line ////////////////////////////

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
