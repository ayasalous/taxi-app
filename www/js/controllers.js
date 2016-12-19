angular.module('starter.controllers', ['ionic.rating','ionic-modal-select',"ion-datetime-picker","ngCordova"] )

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
     $rootScope.LoginData={};
     $rootScope.emailLogin;
       $scope.doLogin = function() {
       console.log('Doing login', $scope.loginData.email,$scope.loginData.password);
        $rootScope.emailLogin={'email':$scope.loginData.email};// For Choose Driver
       console.log( $scope.loginData);
      $rootScope.email={"emailuser":$scope.loginData.email};
       
    
         $ionicLoading.show();
       $http.post( API_URL +'looooginnn',$scope.loginData)
       .then(function(response){
         $ionicLoading.hide();

       console.log("Register process Done with response of:");
       console.log(response.data);

        $rootScope.LoginData=response.data;//Array
        console.log("login dataaaaaaaaaaaaaaaaaa");
console.log($rootScope.LoginData);
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
      console.log($rootScope.LoginData[10]);
      $scope.MangerAddDriver={"email":$scope.MangerAddDriver.email,
                                "password":$scope.MangerAddDriver.password,
                                "first":$scope.MangerAddDriver.first,
                                "last":$scope.MangerAddDriver.last,
                                "number":$scope.MangerAddDriver.number,
                                "cardnumber":$scope.MangerAddDriver.cardnumber,
                                "officename":$rootScope.LoginData[10],


      };

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

.controller('ShowDriverCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
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



.controller('deleteDriverCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
   console.log("in deleteDriverCtrl controller");
})


.controller('tabCtrl', function($scope,$http, $rootScope,$state,$ionicLoading) {
   console.log("tab controller");
   $state.go("app.tab");
})

.controller('DriverCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$cordovaLocalNotification) {
       $scope.getStatusAvilable={"email":$rootScope.email.emailuser};
       console.log(" are you avilable????");
       $http.post( API_URL +'getStatusAvilable',$scope.getStatusAvilable)
       .then(function(response){
       console.log(response.data);
       console.log(response.data[0].available);
       if (response.data[0].available=='1'){
       console.log('111');
       $scope.value={"answer":true};
       }
       else{
       console.log('000');
       $scope.value={"answer":false};
       }
       })


        
      $scope.tt={};
      var value=$scope.value;
      $scope.toggleChange = function() {
      if ($scope.value == false) {
       $scope.value = true;
       } else
       $scope.value = false;

         $scope.tt={"aa":$scope.value,
                     "email":$rootScope.email.emailuser};
       console.log('testToggle changed to ' + $scope.value); 
       console.log( $scope.tt); 

         $http.post( API_URL +'checkAvilableDriver',$scope.tt)
      .then(function(response){
      console.log(response.data);
       });
       };


     


       $scope.readOnly = false;//can choose in rating 
       $scope.rating = {};
       $scope.rating.rate = 1;//defult value
       $scope.rating.max = 5;//number of Star Rating
       console.log($scope.rating.max);

       ////////////////////////////Notification /////
        $scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
       }).then(function () { 
       console.log("The notification has been set");
       });
       };
       $scope.isScheduled = function() {
       $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
       alert("Notification 1234 Scheduled: " + isScheduled);
       });
       }
         //////////////////////////////////////


})

.controller('RegisterCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$cordovaLocalNotification) {
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


.controller('UpdatedriverCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$cordovaLocalNotification) {
      console.log("in Updatedriver controller");
      $scope.updatePage={};
      $scope.name={};
      $scope.updateDriverFromManger=function(){
      
       $scope.updatePage={"emailbeforchange":$rootScope.DriveremailName,
       "firstname":$scope.updatePage.firstname,
       "lastname":$scope.updatePage.lastname,
       "email":$scope.updatePage.email,
       "mobilenumber":$scope.updatePage.mobilenumber,
       "carnumber":$scope.updatePage.carnumber};

      var ff=((''+$scope.updatePage.firstname).length);
      console.log("firstname"+ff);

      var ll=((''+$scope.updatePage.lastname).length);
      console.log("lastname"+ll);
      
      var mm=((''+$scope.updatePage.mobilenumber).length);
      console.log("mobilenumber"+mm);

      var cc=((''+$scope.updatePage.carnumber).length);
      console.log("carnumber"+cc);
      
      var ee=((''+$scope.updatePage.email).length);
      console.log("email"+ee);


 //console.log($scope.updatePage.firstname.length);

    
      if(ff == 9){
      console.log("empty value of first name");
      $scope.updatePage.firstname=$rootScope.DriverFirstName;
      }
      if(ll == 9){
      console.log("empty value of last name");
      $scope.updatePage.lastname=$rootScope.DriverlastName;
      }
       if(ee == 9){
      console.log("empty value of email name");
      $scope.updatePage.email=$rootScope.DriveremailName;
      }
     if(mm == 9){
      console.log("empty value of mobile name");
      $scope.updatePage.mobilenumber=$rootScope.Driverphonenum;
      }
      if(cc == 9){
      console.log("empty value of card name");
      $scope.updatePage.carnumber=$rootScope.Drivercardnum;
      }


      console.log($scope.updatePage.email);
      console.log($scope.updatePage.firstname);
      console.log($scope.updatePage.lastname);
      console.log($scope.updatePage.mobilenumber);
      console.log($scope.updatePage.carnumber);
      

      $ionicLoading.show();
      $http.post(API_URL+'MangerUpdateDriver', $scope.updatePage)
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
      console.log(response.data); 
      var a= response.data.length;
      if( a>5 ){
        $scope.result = "we have already user in this email " ;
      }else{
        $scope.result = '';
         //$state.go('app.loginPage'); 
      }

    });//fun then

}
 
})
.controller('HomeCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$cordovaLocalNotification) {
 $scope.goToRegisterPage=function(){
   $state.go('app.register');
   console.log(" in Fun goToRegisterPage");
 }
 $scope.goToLoginPage=function(){
   $state.go('app.loginPage');
   console.log(" in Fun goToRegisterPage");
 }

})












.controller('DriverOrderNonScedualingCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$cordovaLocalNotification) {
 console.log("in DriverOrderNonScedualingCtrl");

 console.log("driveruser");
})



.controller('MapCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$cordovaLocalNotification, $ionicPopup){
       console.log("Centering");
      $rootScope.lati={};
      $rootScope.long={};
      $rootScope.aya={};
      $rootScope.GeolocationDriver={};
      $rootScope.GeolocationUser={};
      $rootScope.GeolocationManger={};
       $rootScope.GeolocationAllUser={};
       $rootScope.tracking={};
       $scope.mapCreated = function(map) {
       $scope.map = map;
       };//function 




   navigator.geolocation.getCurrentPosition(
       function (pos) {
       console.log('Got pos', pos);///
       $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      
       $rootScope.tracking={"lati":pos.coords.latitude,
                            "long":pos.coords.longitude,
                            "emailuser":$rootScope.email};
console.log($rootScope.tracking.emailuser);
       console.log("tracking data is "+$rootScope.tracking.lati);
       console.log("tracking data is "+$rootScope.tracking.long);
       console.log(pos.coords.latitude);
       console.log(pos.coords.longitude);
       console.log($rootScope.email);//take email from loginCTL

/////////////////////////////////////////////// Save In DataBase /Lati ,Long ////////////////////
       $http.post(API_URL +'tracking',$rootScope.tracking)
       .then(function(response){//send data from ionic to laravel then return sth
       console.log( "save in DB");
       console.log(response.data);       
       });//fun then

       $ionicLoading.hide();
       $rootScope.aya="ayaaaaaaaaaa";
       $rootScope.lati=pos.coords.latitude;
       $rootScope.long=pos.coords.longitude;
       var image ="/img/bluesize.png";
       console.log("$rootScope.lati iiiiiiiiiiiiiiiis "+$rootScope.lati);

         ////////////Take spasific user Geolocation (Users) From DB///////////


if ( $rootScope.LoginData[8]=='user'){ //if the type is user then not show all user by this if statement 
       $http.post( API_URL +'getGeolocationUser',$rootScope.email)
       .then(function(response){//send data from ionic to laravel then return sth
       console.log( "save in DB");
       console.log(response.data);       
        $rootScope.GeolocationUser = response.data;
       var imageuser="/img/markeruser.png";
       
       marker = new google.maps.Marker({
       position: new google.maps.LatLng($rootScope.GeolocationUser[0]['trackLati'], $rootScope.GeolocationUser[0]['trackLong']),
       map: $scope.map,
       animation: google.maps.Animation.DROP,
       icon: imageuser,
       title: 'Hello World!'
       });//marker

       ///////////////////// To Set Msg IN Marker ////////////////////////////
       var user="User"+" "+$rootScope.GeolocationUser[0]['firstname']+'<br>'+$rootScope.GeolocationUser[0]['phonenum'];
       attachSecretMessage(marker, user);
      //  DoubleClickDriverMarker(marker, user);

       function attachSecretMessage(marker, user) {
       var infowindow = new google.maps.InfoWindow({
       content:user
       });
       marker.addListener('click', function() {
       infowindow.open($scope.map, marker);
       });
       }

       /*// login user 
       function DoubleClickDriverMarker(marker, user){
         google.maps.event.addListener(marker, "dblclick", function (e) { 
         console.log("Double Click");
         $state.go('app.DriverOrderNonScedualing');
            });
       }//function **DoubleClickDriverMarker**
*/


      });//fun then
////////////////////////////////////////////////////////////////////////////////////////////
////////////Take All Geolocation (Drivers) From DB *****Only Driver **************Avarialbe******* ///////////
       $http.get(API_URL + 'getlocationD').then(function(response){
       console.log("Driver geolocation "+response.data);
       console.log(response.data);
       $rootScope.GeolocationDriver = response.data;
       
       for(var i=0;i<response.data.length;i++){
       var imagedriver="";
       if ($rootScope.GeolocationDriver [i]['nameoffice']=='madina'){
       console.log("madinaaaaaaaaaaaaaaaaaaaaaaa icooooooon imagggeeeeeeeeeeeee");
       imagedriver="/img/madina.png";
       }
       else{
       console.log("not madina icooooooon imagggeeeeeeeeeeeee");
       imagedriver="/img/taxi4.png";
       }

       console.log(imagedriver);
       console.log($rootScope.GeolocationDriver [i]['trackLati']);
       console.log( $rootScope.GeolocationDriver [i]['trackLong']);
       ///////Put Marker
       console.log(imagedriver);
      marker = new google.maps.Marker({
      position: new google.maps.LatLng($rootScope.GeolocationDriver[i]['trackLati'],$rootScope.GeolocationDriver [i]['trackLong']),
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: imagedriver,
      title: 'Hello World!'
      });//marker
      ///////////////////// To Set Msg IN Marker ////////////////////////////
      console.log($rootScope.GeolocationDriver);
       var driveruser="Driver Name:"+$rootScope.GeolocationDriver[i]['firstname']+'<br>'+"Phone Number:"+$rootScope.GeolocationDriver[i]['phonenum'];
       var VardriverchooseEmail=$rootScope.GeolocationDriver[i]['email'];
       attachSecretMessage(marker, driveruser);
       DoubleClickDriverMarker(marker, driveruser,VardriverchooseEmail);
 //check the order Table 









     }//for  
function attachSecretMessage(marker, driveruser) {
       var infowindow = new google.maps.InfoWindow({
       content: driveruser
       });
       marker.addListener('click', function() {
       infowindow.open($scope.map, marker);
       });
       }//function **attachSecretMessage**
function DoubleClickDriverMarker(marker, driveruser,VardriverchooseEmail){
    $rootScope.timeOrderNonscedualing={};
       $scope.hourOrderNonscedualing={};
       $scope.minuteOrderNonscedualing={};
       $scope.secondOrderNonscedualing={};
       $scope.am_pmOrderNonscedualing={};
$scope.getDatetime = {};

         google.maps.event.addListener(marker, "dblclick", function (e) { 
         console.log("Double Click"); 
        // $state.go('app.DriverOrderNonScedualing');
var confirmPopup = $ionicPopup.confirm({
     title: 'Order Driver',
     template: driveruser
     });

     confirmPopup.then(function(res) {
     if(res) {

    console.log('You are sure');
    console.log("dirverchoosen is=== "+ VardriverchooseEmail);   
    console.log("User Email is=== "+ $rootScope.emailLogin.email); 
    console.log("driver Doubleclick Info "+driveruser);
    
$scope.getDatetime = new Date();

console.log($scope.getDatetime);
       var timeOrderNonscedualing = $scope.getDatetime.toString().split(" ");
       var time1OrderNonscedualing = timeOrderNonscedualing[0];
       var time2OrderNonscedualing = timeOrderNonscedualing[1];
       console.log( timeOrderNonscedualing);
       console.log(time1OrderNonscedualing);
       console.log(time2OrderNonscedualing);


       var AllhourOrderNonscedualing = timeOrderNonscedualing[4].toString().split(":");
       $scope.hourOrderNonscedualing=AllhourOrderNonscedualing[0];
       $scope.minuteOrderNonscedualing=AllhourOrderNonscedualing[1];
       $scope.secondOrderNonscedualing=AllhourOrderNonscedualing[2];

       console.log(AllhourOrderNonscedualing);
       console.log(AllhourOrderNonscedualing[0]);
       console.log(AllhourOrderNonscedualing[1]);
       console.log(AllhourOrderNonscedualing[2]);
       if (12<$scope.hourOrderNonscedualing){
       $scope.hourOrderNonscedualing=$scope.hourOrderNonscedualing-12;
       $scope.am_pmOrderNonscedualing="pm";
       }else
       $scope.am_pmOrderNonscedualing="am";
      

console.log($scope.hourOrderNonscedualing);
console.log($scope.minuteOrderNonscedualing);
console.log($scope.secondOrderNonscedualing);
console.log($scope.am_pmOrderNonscedualing);

 $scope.DriverInfoFromDoubleClick={"driverEmial":VardriverchooseEmail,
                                   "UserEmail":$rootScope.emailLogin.email,
                                   "hourOrder":$scope.hourOrderNonscedualing,
                                   "secondorder": $scope.minuteOrderNonscedualing,
                                    "am_pm":$scope.am_pmOrderNonscedualing};




    $http.post( API_URL +'DoubleclickToOrderDriver',$scope.DriverInfoFromDoubleClick)
       .then(function(response){
console.log(response.data);



    });

     } else {
     console.log('You are not sure');
     }
     });
     });
     }//function **DoubleClickDriverMarker**



});//get Show Only Driver Avilable
////////////////////////////////////////////////////////////////////////////////////////////




}else{//if driver of manger login then show all user in the Map
       console.log("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee if driver of manger login then show all user in the Map");
       $http.get(API_URL + 'getGeolocationAllUser').then(function(response){
       console.log("Driver geolocation "+response.data);
       console.log(response.data);
       $rootScope.GeolocationAllUser = response.data;
       for(var i=0;i<response.data.length;i++){
       console.log($rootScope.GeolocationAllUser[i]['trackLati']);
       console.log($rootScope.GeolocationAllUser[i]['trackLong']);
       console.log("emailllllllllllllll  ");
       console.log($rootScope.GeolocationAllUser[i]['email']);
       console.log("loginnnnnnnnnnn userrrrrrrrrrr to teeeeeeest   ");
       console.log($rootScope.email);
       ///////Put Marker
        var imageuser="/img/markeruser.png";
        marker = new google.maps.Marker({
        position: new google.maps.LatLng($rootScope.GeolocationAllUser[i]['trackLati'],
        $rootScope.GeolocationAllUser[i]['trackLong']),
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        icon: imageuser,
        title: 'Hello World!'
        });//marker  

       

       ///////////////////// To Set Msg IN Marker ////////////////////////////
       var Alluser="User"+" "+$rootScope.GeolocationAllUser[i]['firstname']+'<br>'+$rootScope.GeolocationAllUser[i]['phonenum'];
       attachSecretMessage(marker, Alluser);
      // DoubleClickDriverMarker(marker, Alluser);
       }//for
       
       function attachSecretMessage(marker, Alluser) {
       var infowindow = new google.maps.InfoWindow({
       content: Alluser
       });
       marker.addListener('click', function() {
       infowindow.open($scope.map, marker);
       });
       }//fun 

  /*     function DoubleClickDriverMarker(marker, Alluser){
         google.maps.event.addListener(marker, "dblclick", function (e) { 
         console.log("Double Click"); 
         $state.go('app.DriverOrderNonScedualing');
       });
       }//function **DoubleClickDriverMarker**
*/

        });//get
/////////////////////////////////////////////Show ******All Driver/////////////////////////////////
       ////////////Take All Geolocation (Drivers) From DB///////////
       $http.get(API_URL + 'getGeolocationDriver').then(function(response){
       console.log("Driver geolocation "+response.data);
       console.log(response.data);
       $rootScope.GeolocationDriver = response.data;
       
       for(var i=0;i<response.data.length;i++){
       var imagedriver="";
       if ($rootScope.GeolocationDriver [i]['nameoffice']=='madina'){
       console.log("madinaaaaaaaaaaaaaaaaaaaaaaa icooooooon imagggeeeeeeeeeeeee");
       imagedriver="/img/madina.png";
       }
       else{
       console.log("not madina icooooooon imagggeeeeeeeeeeeee");
       imagedriver="/img/taxi4.png";
       }

       console.log(imagedriver);
       console.log($rootScope.GeolocationDriver [i]['trackLati']);
       console.log( $rootScope.GeolocationDriver [i]['trackLong']);
       ///////Put Marker
       console.log(imagedriver);
      marker = new google.maps.Marker({
      position: new google.maps.LatLng($rootScope.GeolocationDriver[i]['trackLati'],$rootScope.GeolocationDriver [i]['trackLong']),
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      icon: imagedriver,
      title: 'Hello World!'
      });//marker
      ///////////////////// To Set Msg IN Marker ////////////////////////////
       var driveruser="Driver Name: "+" "+$rootScope.GeolocationDriver[i]['firstname']+'<br>'+"Phone Number: "+$rootScope.GeolocationDriver[i]['phonenum'];
       attachSecretMessage(marker, driveruser);
       DoubleClickDriverMarker(marker, driveruser);

      }//for  
       function attachSecretMessage(marker, driveruser) {
       var infowindow = new google.maps.InfoWindow({
       content: driveruser
       });
       marker.addListener('click', function() {
       infowindow.open($scope.map, marker);
       });
       }//function


       function DoubleClickDriverMarker(marker, driveruser){
         google.maps.event.addListener(marker, "dblclick", function (e) { 
         console.log("Double Click"); 
         //$state.go('app.DriverOrderNonScedualing');
   var confirmPopup = $ionicPopup.confirm({
     title: 'Order Driver',
     template: driveruser
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });




   });
       }//function **DoubleClickDriverMarker**

      });//get

 ////////////Take All Geolocation (Manger) From DB Only for Driver & Manger ***NOT for user///////////
       $http.get(API_URL + 'getGeolocationManger').then(function(response){
       console.log("Driver geolocation "+response.data);
       console.log(response.data);
       $rootScope.GeolocationManger= response.data;
       
        for(var i=0;i<response.data.length;i++){
       console.log($rootScope.GeolocationManger[i]['trackLati']);
       console.log( $rootScope.GeolocationManger[i]['trackLong']);
       ///////Put Marker
       var imagemanger="/img/markermanger.png";
       
       
       marker = new google.maps.Marker({
       position: new google.maps.LatLng($rootScope.GeolocationManger[i]['trackLati'], $rootScope.GeolocationManger[i]['trackLong']),
       map: $scope.map,
       animation: google.maps.Animation.DROP,
       icon: imagemanger,
       title: 'Hello World!'
       });//marker

       var manger="Manger"+" "+$rootScope.GeolocationManger[i]['firstname']+'<br>'+$rootScope.GeolocationManger[i]['phonenum'];
       attachSecretMessage(marker, manger);
 //DoubleClickDriverMarker(marker, manger);

       }//for
       
  function attachSecretMessage(marker, manger) {
        var infowindow = new google.maps.InfoWindow({
          content: manger
        });


        marker.addListener('click', function() {
          infowindow.open($scope.map, marker);
        });
        }
      
 /*//manger
 function DoubleClickDriverMarker(marker, driveruser){
         google.maps.event.addListener(marker, "dblclick", function (e) { 
         console.log("Double Click"); 
         $state.go('app.DriverOrderNonScedualing');

            });
       }//function **DoubleClickDriverMarker**
   */    

        });//get



}//else
 

       }, function (error) {
       alert('Unable to get location: ' + error.message);
       }//error
       );//getcurrent location
////////////////////////////////////////////// Center Me /////////////////////////////////

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
       $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));//32.2197215, 35.2755521));
       $ionicLoading.hide();

       $rootScope.lati=pos.coords.latitude;
       $rootScope.long=pos.coords.longitude;

       var imageCenterMe;
        if ($rootScope.LoginData[8]=='user'){
       imageCenterMe="/img/markeruser.png";
       }
        else if ($rootScope.LoginData[1]=='driver'){
       imageCenterMe="/img/madina.png";
       }
        else if ($rootScope.LoginData[8]=='manger'){
       imageCenterMe="/img/markermanger.png";
       }

       //var image ="/img/bluesize.png";
       marker = new google.maps.Marker({
       position: new google.maps.LatLng($rootScope.lati, $rootScope.long),//32.2197215, 35.2755521),
       map: $scope.map,
       animation: google.maps.Animation.DROP,
       icon: imageCenterMe,


       title: 'Hello World!'
       });//marker 
           }, function (error) {
       alert('Unable to get location: ' + error.message);
       }//error
       );//getcurrent location
console.log("at end of function "+$rootScope.lati,$rootScope.long);

        };//function

console.log("at end of controoler "+$rootScope.lati,$rootScope.long);


})










.controller('mangerCheckADDChildeCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$document,$cordovaLocalNotification) {
     console.log("in mangerCheckADDChildeCtrl controller"); 
     $rootScope.chooseDriverInfoAndUserInfo={};
      $rootScope.childInfooo={};
      $http.get( API_URL +'getChildInfo')
      .then(function(response){//send data from ionic to laravel then return sth
      $ionicLoading.hide();
      console.log(response.data);       
      $rootScope.ShowChildeFromUserAdd=response.data;
      console.log( $rootScope.ShowChildeFromUserAdd);
      });//fun then

      
      $rootScope.selectables={};
      $scope.someModel={};
  


  $scope.shoutLoud = function(newValuea, oldValue,childInfo){
     console.log("changed from " + JSON.stringify(oldValue) + " to " + JSON.stringify(newValuea));
     console.log(newValuea.email);
     $rootScope.childInfooo=childInfo;
     console.log($rootScope.childInfooo.id);
     $rootScope.chooseDriverInfoAndUserInfo={"driverEmail":newValuea.email,
                                             "ParentEmail": $rootScope.childInfooo.ParentEmail,
                                             "idOrder":$rootScope.childInfooo.id};

     console.log( $rootScope.childInfooo.ParentEmail);
  
     $http.post( API_URL +'DriverResponseInfoAndParentInfo', $rootScope.chooseDriverInfoAndUserInfo)
     .then(function(response){
     console.log(response.data);
     });


  };//shoutload



       $http.get(API_URL + 'getGeolocationDriver').then(function(response){
       console.log("Driver geolocation "+response.data);
       console.log(response.data);
       $rootScope.ALLDriver = response.data;
       console.log($rootScope.ALLDriver);
       console.log($rootScope.ALLDriver[0]['firstname']);
       $rootScope.selectables = response.data;
       

        });



})

.controller('AddChildrenCtrl', function($scope,$http, $rootScope,$state,$ionicLoading,$cordovaLocalNotification) {
       console.log("in AddChildrenCtrl controller"); 
       $scope.addchildren={};
       $rootScope.hello={};
       $rootScope.Price={};
       $rootScope.time={};
       $scope.hour={};
       $scope.minute={};
       $scope.second={};
       $scope.am_pm={};
       $rootScope.res={};
       $scope.change=function(timechoose){
       $rootScope.time=timechoose;   
       
       console.log( timechoose);
       var time = timechoose.toString().split(" ");
       var time1 = time[0];
       var time2 = time[1];
       console.log( time);
       console.log(time1);
       console.log(time2);
       var Allhour = time[4].toString().split(":");
       $scope.hour=Allhour[0];
       $scope.minute=Allhour[1];
       $scope.second=Allhour[2];
       console.log(Allhour);
       console.log(Allhour[0]);
       console.log(Allhour[1]);
       console.log(Allhour[2]);
       if (12<$scope.hour){
       $scope.hour=$scope.hour-12;
       console.log($scope.hour);
       $scope.am_pm="pm";
       }else
       $scope.am_pm="am";
        };

        $scope.submitAddChildren = function(){
        $scope.addchildrenWithEmailParentOfChild={"ParentEmail":$rootScope.email.emailuser,
                                               "numberchildren":$scope.addchildren.numberChildren,
                                               "mobilenum":$scope.addchildren.mobilenum,
                                               "fromplace":$scope.addchildren.fromplace,
                                               "toplace":$scope.addchildren.toplace,
                                               "ParentFirstname":$rootScope.genericFirstName,
                                               "ParentLastname":$rootScope.genericsecondName,
                                               "PaymentMethod":$scope.addchildren.Payment,
                                               "hour":$scope.hour,
                                               "minute":$scope.minute,
                                               "second":$scope.second,
                                               "am_pm":$scope.am_pm};
       console.log($rootScope.time);
       console.log("$scope.addchildren.Payment"+$scope.addchildren.Payment); 
       console.log($rootScope.genericFirstName);
       console.log($rootScope.genericsecondName);
       $ionicLoading.show();
       console.log($scope.addchildrenWithEmailParentOfChild);
       $http.post( API_URL +'AddChildren',$scope.addchildrenWithEmailParentOfChild)
       .then(function(response){//send data from ionic to laravel then return sth
       $ionicLoading.hide();
       console.log(response.data);       
       $scope.result=response.data;
       });//fun then

       };//fun submit



})




.controller('TestmapCtrl', function($scope, $ionicLoading,$cordovaLocalNotification) {
       console.log("Centering");       
})

.controller('UserCtrl', function($scope,$http, $rootScope,$state,$cordovaLocalNotification) {
console.log("in UserCtrl controller");
})


.controller('BrowseCtrl', function($scope,$http, $rootScope,$state,$cordovaLocalNotification) {
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


