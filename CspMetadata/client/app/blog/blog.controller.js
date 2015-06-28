'use strict';

angular.module('cspMetadataApp')
  .controller('BlogCtrl', [
    '$scope', '$modal', '$log','providers','Auth', '$http','Modal',
    function($scope, $modal, $log,providers,Auth, $http, Modal){
      //$scope.providers = providers.providers;
      $scope.providers = [];
      $scope.someKey = true;
      $http.get('/api/providers')
        .error(console.log)
        .success(function(results) {
          $scope.providers = JSON.parse(JSON.stringify(results));

          $http.post('/api/providers/rating/getAverageRating',results)
            .error(console.log)
            .success(function(result) {
              $scope.providers = JSON.parse(JSON.stringify(result));
              $scope.someKey = ! $scope.someKey;
            });
        });

      //console.log(providers);
      $scope.isLoggedIn = Auth.isLoggedIn;

      $scope.addProvider = function(){
        if(!$scope.name || $scope.name === '') { return; }
        if(!$scope.url || $scope.url === '') { return; }
        providers.create({
          name: $scope.name,
          url: $scope.url,
          upvotes: 0
        });

        providers.getAll()
          .success(function(data) {
            $scope.providers = providers.providers;
          });
        $scope.name = '';
        $scope.url = '';
      };
      //$scope.delete = Modal.confirm.delete
      $scope.deleteProvider = Modal.confirm.delete(function (provider_id) {
        //console.log('hi');
        providers.deleteProvider(provider_id)

          .success(function () {
            $scope.status = 'Deleted Provider! Refreshing provider list.';

            for (var i = 0; i < $scope.providers.length; i++) {
              var provider = $scope.providers[i];
              //console.log(i,provider,provider_id)
              //console.log(provider.ID);
              if (provider._id === provider_id) {
                //console.log(provider._id === provider_id)
                // console.log(provider._id);
                $scope.providers.splice(i, 1);
                providers.getAll();
                break;
              }
            }
            // $scope.posts = null; // i am not sure how to write  for comment as well?

          })
          .error(function (error) {
            $scope.status = 'Unable to delete provider: ' + error.message;
          });
      });


      $scope.incrementUpvotes = function(provider) {
        providers.upvote(provider);
      };

      /*------using Modal from UI-bootstrap-----------------*/

      $scope.modalUpdateProvider = function (size,provider) {
        /*open a modal window to update a single provider record*/
        var modalInstance = $modal.open({
          templateUrl: 'app/blog/update_provider_model.html',

          controller: function ($scope, $modalInstance, provider){
            $scope.provider = provider;
            $scope.ok = function () {
              $modalInstance.close($scope.provider);
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
            $scope.updateProvider = function (updatedProvider) {
              var provider = updatedProvider;
              // console.log('call from controller',provider);
              providers.updateProvider(provider)
                .success(function () {
                  providers.getAll();
                  $scope.status = 'Updated provider! Refreshing provider list.';

                }).
                error(function(error) {
                  alert('Unable to update provider: ' + error);
                });
            };
          },
          size: size,
          resolve: {
            provider: function () {
              return provider;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
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
        key : "=ngClass",
        readonly: "=?"
      },
      link : function(scope, elem, attrs) {
        if (scope.max == undefined) { scope.max = 5; }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : (i < scope.ratingValue)
            });
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly == false){
            scope.ratingValue = index + 1;
            scope.onRatingSelected({
              rating: index + 1
            });
          }
        };
        scope.$watch("ratingValue", function(oldVal, newVal) {
         // alert(newVal);
         // if (newVal || newVal>-1) {
            updateStars();
        //  }
        });
        scope.$watch("key", function(oldVal, newVal) {
          updateStars();
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
        key : "=ngClass",
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
        /*scope.$watch("averageRatingValue", function(oldVal, newVal) {
          //alert('average modified');
          //alert(JSON.stringify(newVal));
          alert("h world");
          if (newVal || newVal>-1) {
            updateStars();
          }
        });*/
        scope.$watch("key", function(oldVal, newVal) {
          updateStars();
        });
      }
    };
  });
