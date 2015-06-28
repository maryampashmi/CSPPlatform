'use strict';

angular.module('cspMetadataApp')
  .controller('RatingCtrl',['$scope','providers',
    function($scope,providers){
    $scope.user1 = {rating:5};
    $scope.user2 = {rating:2};
    $scope.user3 = {rating:1};
    $scope.averageRating = 0;

      providers.getAll()
        .success(function(data) {
          $scope.providers = providers.providers;
          console.log(data);
        }

      );

    $scope.$watch(function(){return $scope.user1.rating + $scope.user2.rating + $scope.user3.rating;}, function(oldVal, newVal) {
      if (newVal) { updateAverageRating(); }
    });

    function updateAverageRating(){ $scope.averageRating = ($scope.user1.rating + $scope.user2.rating + $scope.user3.rating) / 3; }

    $scope.isReadonly = true;
    $scope.rateFunction = function(rating) {
      console.log("Rating selected: " + rating);
    };
  }]);


