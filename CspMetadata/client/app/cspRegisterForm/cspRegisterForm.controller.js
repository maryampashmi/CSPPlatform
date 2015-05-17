'use strict';

angular.module('cspMetadataApp')
  .controller('CspRegisterFormCtrl', ['$scope', 'providers','countries','Auth', '$http','$state',
    function($scope,providers,countries,Auth,$http,$state){


     /* $scope.isEditor = Auth.isEditor;
      $scope.isLoggedIn=Auth.isLoggedIn;*/
      $scope.provider={};
      $scope.locations = countries.locations;


      $scope.save = function () {

        $scope.$watch('selected', function(nowSelected){
          $scope.provider.services = [];
         // $scope.provider.locations = [];

          if( ! nowSelected ){
            // here we've initialized selected already
            // but sometimes that's not the case
            // then we get null or undefined
            return;
          }
          angular.forEach(nowSelected, function(val1){ //,val2
            $scope.provider.services.push( val1.id.toString() );

          //  $scope.provider.locations.push( val2.id.toString() );
          });

        });

        var formData = {
          'name': $scope.provider.name,
          'abbreviated': $scope.provider.abbreviated,
          'services': $scope.provider.services,
          'locations': $scope.provider.locations,
          'description': $scope.provider.description,
          'url': $scope.provider.url

        };
        $scope.provider.name = '';
        $scope.provider.abbreviated = '';
        $scope.provider.services = [];
        $scope.provider.locations = [];
        $scope.provider.description = '';
        $scope.provider.url = '';

        //var jdata = 'mydata=' + JSON.stringify(formData);
        console.log(JSON.stringify(formData));
        $http.post('/api/providers/', formData)
          .success(function (res) {
            $state.go('main');
            console.log('successfully save in database');  //what is normal error i can write here in order to be clear for user?
          })
          .error(function (err) {
            console.log("coudn't store it in database");
          });
      }


  }])
