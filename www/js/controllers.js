angular.module('starter.controllers', ['ionic.rating'] )

.controller('AppCtrl', function($scope,$rootScope, $ionicModal, $timeout,$rootScope,$http,$location,$state,$window) {
  console.log('123');
 ///$rootScope.hideDriverImg = false;///in fiixed image
 //////////////////////////////////////////////////////////////////////////////// $rootScope.driverInfo={};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();

  };
 $scope.loginData = {};//must put outside of function submit
   $scope.doLogin = function() {    
  $timeout(function() {
      $scope.closeLogin();
    }, 1000);
};//fun do login
})//controller





.controller('loginPageCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
       $scope.loginData = {};//must put outside of function submit
       $scope.doLogin = function() {
       console.log('Doing login', $scope.loginData.email,$scope.loginData.password);
       console.log( $scope.loginData);
         $ionicLoading.show();
       $http.post( API_URL +'looooginnn',$scope.loginData)
       .then(function(response){
         $ionicLoading.hide();
       console.log("Register process Done with response of:");
       console.log(response.data);
        console.log(response.data.length);

      
       console.log(response.data.length); 
       var authEmail= response.data.length;
       console.log(response.data[9]);
       $rootScope.genericFirstName =response.data[2];//can used in any controller and any page 
       $rootScope.genericsecondName =response.data[3];
       $rootScope.genericOfficeName =response.data[10];
       $rootScope.generictype =response.data[1];//type of user login
       $rootScope.genericimage =response.data[8];//image of user login
       
       $rootScope.genericOfficeInputHidden={};

       console.log(  $rootScope.genericFirstName);
       console.log(  $rootScope.genericsecondName);
       console.log(  $rootScope.genericOfficeName);
       console.log(  $rootScope.genericOfficeName);
       if( response.data[9]=="inDB" )
       {//not in DB
        if (response.data[1]=="driver"){
        $state.go('app.driver');
        }
       if (response.data[1]=="manger"){
         $state.go('app.manger');
        }
          if (response.data[1]=="user"){
         $state.go('app.user');
        }  
       }//if
        else{//inDB  
               $state.go('app.browse');
            }//else inDB
       });//fun then
       };//fun do login
})


.controller('MangerAddDriverCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
      $scope.MangerAddDriver= {};
      $scope.result= "";
      $scope.MangerAddDriversubmit = function(){
      $ionicLoading.show();
      console.log($scope.MangerAddDriver);
      $http.post( API_URL +'MangerAddDriver',$scope.MangerAddDriver)
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
      console.log("Register process Done with response of:");
      console.log( $scope.user);
      console.log(response.data);       
      console.log(response.data.localeCompare("notDone")); 
      console.log(response.data.length); 
      var a= response.data.length;
      if( a>5 )
      {
        $scope.result = "we have already user in this email " ;
      } else
        {
          $scope.result = '';
        }
      });
      };//fun MangerAddDriversubmit
$rootScope.resultShowDriver={};
      $scope.goShowDriver=function(){///Page manger
      $state.go('app.showDriver');
      console.log(" in Fun goToRegisterPage");
      console.log(" before send data to laravel To ShowDriver ");
      console.log($rootScope.genericOfficeName);
      $scope.office={"nameoffice":$rootScope.genericOfficeName}; 
      $ionicLoading.show();
      console.log($scope.office);
      $http.post( API_URL +'showDriver',$scope.office)
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
     if (response.data.length==0){
$rootScope.resultShowDriver="you Don't have Driver";

     } else{
$rootScope.resultShowDriver="";
      console.log(response.data[0]['id']);
      console.log(response.data.length);
       console.log(response.data);
      $rootScope.driversname=response.data;
      console.log($scope.driversname);
    }
     });
        };//fun

})

.controller('ShowDriverCtrl', function($scope,$http, $rootScope,$state) {
  console.log("in ShowDriver  controller");
  console.log($rootScope.genericOfficeName); 
  


  $rootScope.Globall={};

  $scope.updatedriver=function(driver){
  Globall=driver;
 
  console.log(driver);
 console.log(Globall.lastname);
$rootScope.DriverFirstName=Globall.firstname;
$rootScope.DriverlastName=Globall.lastname;
$rootScope.DriveremailName=Globall.email;
$rootScope.Driverphonenum=Globall.phonenum;
$rootScope.Drivercardnum=Globall.cardnum;


 console.log($rootScope.DriverFirstName);
 console.log($rootScope.DriverlastName);
 console.log($rootScope.DriveremailName);
 console.log($rootScope.Driverphonenum);
 console.log($rootScope.Drivercardnum);
 $state.go('app.updatedriver');

  };//fun
   

 $rootScope.deleteID={};
 $scope.deletedriver=function(driver){
 deleteID=driver;
$rootScope.DeleteDriverID={"DriverID":deleteID.id};
console.log($rootScope.DeleteDriverID);

$http.post( API_URL +'deleteDriver',$rootScope.DeleteDriverID);

$state.go('app.showDriver');
  };//fun
   

    })


.controller('UpdatedriverCtrl', function($scope,$http, $rootScope,$state) {
  console.log("in Updatedriver controller");
  $scope.updatePage={};
  $scope.updateDriverFromManger=function(){
  console.log("in updateDriverFromManger controller");




 }

})

.controller('deleteDriverCtrl', function($scope,$http, $rootScope,$state) {
   console.log("in deleteDriverCtrl controller");
})


.controller('tabCtrl', function($scope,$http, $rootScope,$state) {
   console.log("tab controller");
   $state.go("app.tab");
})



.controller('DriverCtrl', function($scope,$http, $rootScope,$state) {
      $scope.value={"answer":false};
      var value=$scope.value.answer;
      $scope.toggleChange = function() {
      if ($scope.value == false) {
       $scope.value = true;
       } else
       $scope.value = false;
       console.log('testToggle changed to ' + $scope.value);
       };
       $scope.readOnly = false;//can choose in rating 
       $scope.rating = {};
       $scope.rating.rate = 1;//defult value
       $scope.rating.max = 5;//number of Star Rating
       console.log($scope.rating.max);
})




.controller('RegisterCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
  $scope.result = "";
       ///////////////$rootScope.hideDriverImg = true;/// in fixed image 
      /*$http.get(API_URL + 'login').then(function(response){
      console.log(response.data);
      $scope.test = response.data;
      });*/
      $scope.user = {};
      $scope.submitRegister = function(){
      $ionicLoading.show();
      console.log($scope.user);
      $http.post( API_URL +'register',$scope.user)
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
      console.log("Register process Done with response of:");
      console.log("  $scope.user.type ===="+  $scope.user.type);
      console.log( $scope.user);
      console.log(response.data);       
      console.log(response.data.localeCompare("notDone")); 
      console.log(response.data.length); 
      var a= response.data.length;
      if( a>5 ){
        $scope.result = "we have already user in this email " ;
     }else{
        $scope.result = '';
         $state.go('app.loginPage'); 
     }

    });//fun then

  };//fun submit
 $rootScope.genericName = "diver";
 $rootScope.typeuser =$scope.user.type;
})


.controller('HomeCtrl', function($scope,$http, $rootScope,$state) {
 $scope.goToRegisterPage=function(){
   $state.go('app.register');
   console.log(" in Fun goToRegisterPage");
 }
 $scope.goToLoginPage=function(){
   $state.go('app.loginPage');
   console.log(" in Fun goToRegisterPage");
 }

})



















.controller('MapCtrl', function($scope, $ionicLoading) {
       console.log("Centering");
       $scope.mapCreated = function(map) {
       $scope.map = map;
       };//function 



       $scope.centerOnMe = function () {
       console.log("Centering");
       if (!$scope.map) {
       return;
       }
       $ionicLoading.show({
       content: 'Getting current location...',
       showBackdrop: false
       });//show

      navigator.geolocation.getCurrentPosition(
       function (pos) {
       console.log('Got pos', pos);///
       $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
       $ionicLoading.hide();

      var lati=pos.coords.latitude;
      var long=pos.coords.longitude
      var image ="/img/bluesize.png";
       marker = new google.maps.Marker({
       position: new google.maps.LatLng(lati, long),
       map: $scope.map,
       animation: google.maps.Animation.DROP,
                   icon: image,


       title: 'Hello World!'
       });//marker 
           }, function (error) {
       alert('Unable to get location: ' + error.message);
       }//error
       );//getcurrent location


        };//function










})
















.controller('TestmapCtrl', function($scope, $ionicLoading) {
       console.log("Centering");
       
       $scope.mapCreated = function(map) {
       $scope.map = map;
        
       };
      

       $scope.marker ;   
       $scope.map;
       $scope.centerOnMe = function () {
       console.log("Centering");
       if (!$scope.map) {
       return;
       }
       $ionicLoading.show({
       content: 'Getting current location...',
       showBackdrop: false
       });
       navigator.geolocation.getCurrentPosition(
       function (pos) {
       console.log('Got pos', pos);///
       $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
       




       $scope.marker = new google.maps.Marker({
       position: new google.maps.LatLng($scope.lat, $scope.long),
       map: $scope.map,
       title: 'Holas!'
       }, function(err) {
       console.err(err);
       });
       $ionicLoading.hide();
    
       




       }, function (error) {
       alert('Unable to get location: ' + error.message);
       }
       );//getposuotion
       };

 /*$scope.gatAddress=function(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
*/
})

.controller('UserCtrl', function($scope,$http, $rootScope,$state) {
console.log("in UserCtrl controller");
})


.controller('BrowseCtrl', function($scope,$http, $rootScope,$state) {
console.log("in BrowseCtrl controller");
})

.controller('PlaylistsCtrl', function($scope,$http) {
      $scope.registerUser = function(){
      $http.post('http://localhost:8000/api/register',{email:"ayasalous12343@gmail.com",password:"123"})
      .then(function(data){    
      console.log('aya salous in ioniccc');
      console.log(data.response);

      });
      alert("registerUser btn has been clicked!");
      }
      $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
      ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});


