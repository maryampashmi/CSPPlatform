'use strict';

angular.module('cspMetadataApp')
  .controller('MainCtrl', [
    '$scope','providers','$stateParams','$modal', '$log','Auth','$http',
    function($scope,providers,$stateParams,$modal, $log,Auth,$http){
      var promise = $http.get('/api/providers')

    var errorHandler = function(resoan) {
      alert('wrong things is happened.')
    }

  promise.then(function(response) {
    $scope.providers = response.data;

  }, errorHandler)
  $scope.cloudSortOrder = "- createdOn"

  $scope.isLoggedIn = Auth.isLoggedIn;

  $scope.user = Auth.getCurrentUser();
    }])

  .directive('providerInfo', function () {
    return {
      templateUrl: 'app/main/providerInfo/providerInfo.html',
      restrict: "E",
      controller: function($scope) {
        $scope.collapse = function(provider) {
          provider.isCollapsed = !provider.isCollapsed;
        }
      }
    }
  })
  .directive('description', function () {
    return {
      restrict: "E",
      templateUrl: 'app/main/description/description.html',
      scope: true,
      controller: function($scope) {
        $scope.collapsed = true;
        $scope.collapseDes = function() {
          $scope.collapsed = true;
        }
        $scope.expandDes = function() {
          $scope.collapsed = false;
        }
      }
    }
  })
  .directive('showLink', function () {
    return {
      restrict: "E",
      templateUrl: 'app/main/showLink/showLink.html',
     //scope: true,
      controller: function($scope,$window) {
        $scope.collapsed = true;
        $scope.collapseLink = function() {
          $scope.collapsed = true;
        }
        $scope.expandLink = function() {
          $scope.collapsed = false;
        }
        $scope.linkModelFunc = function (url){
          $window.open(url);
        }
      }
    }
  })
  .directive('listOfServices', function () {
    return {
      templateUrl: 'app/main/listOfServices/listOfServices.html',
      restrict: 'E',
      scope: true,
      controller: function($scope) {
        $scope.collapsed = false;
        $scope.collapseList = function() {
          $scope.collapsed = true;
        }
        $scope.expandList = function() {
          $scope.collapsed = false;
        }
      }
    }
  })
  .directive('location', function () {
    return {
      templateUrl: 'app/main/location/location.html',
      restrict: 'E',
      scope: true,
      controller: function($scope) {
        $scope.collapsed = false;
        $scope.collapseList = function() {
          $scope.collapsed = true;
        }
        $scope.expandList = function() {
          $scope.collapsed = false;
        }
      }
    }
  })


















  /*.controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
*/
