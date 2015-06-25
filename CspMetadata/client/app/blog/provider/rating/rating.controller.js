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
  }])
  .directive("starRating", function() {
    return {
      restrict : "EA",
      template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
      "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
      "    <i class='fa fa-star'></i>" + //&#9733
      "  </li>" +
      "</ul>",
      scope : {
        ratingValue : "=ngModel",
        max : "=?", //optional: default is 5
        onRatingSelected : "&?",
        readonly: "=?"
      },
      link : function(scope, elem, attrs) {
        if (scope.max == undefined) { scope.max = 5; }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : (i < scope.ratingValue.rating)
            });
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly == false){
            scope.ratingValue.rating = index + 1;
            scope.onRatingSelected({
              rating: index + 1
            });
          }
        };
        scope.$watch("ratingValue.rating", function(oldVal, newVal) {
          if (newVal) { updateStars(); }
        });
      }
    };
  })
  .directive("averageStarRating", function() {
    return {
      restrict : "EA",
      template : "<div class='average-rating-container'>" +
      "  <ul class='rating background' class='readonly'>" +
      "    <li ng-repeat='star in stars' class='star'>" +
      "      <i class='fa fa-star'></i>" + //&#9733
      "    </li>" +
      "  </ul>" +
      "  <ul class='rating foreground' class='readonly' style='width:{{filledInStarsContainerWidth}}%'>" +
      "    <li ng-repeat='star in stars' class='star filled'>" +
      "      <i class='fa fa-star'></i>" + //&#9733
      "    </li>" +
      "  </ul>" +
      "</div>",
      scope : {
        averageRatingValue : "=ngModel",
        max : "=?", //optional: default is 5
      },
      link : function(scope, elem, attrs) {
        if (scope.max == undefined) { scope.max = 5; }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({});
          }
          var starContainerMaxWidth = 100; //%
          scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
        };
        scope.$watch("averageRatingValue", function(oldVal, newVal) {
          if (newVal) { updateStars(); }
        });
      }
    };
  });

