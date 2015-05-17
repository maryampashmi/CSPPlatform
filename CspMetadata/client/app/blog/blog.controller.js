'use strict';

angular.module('cspMetadataApp')
  .controller('BlogCtrl', [
    '$scope', '$modal', '$log','providers','Auth', '$http','Modal',
    function($scope, $modal, $log,providers,Auth, $http, Modal){
      //$scope.providers = providers.providers;
      $scope.providers = [];
      $http.get('/api/providers')
        .error(console.log)
        .success(function(results) {
          $scope.providers = results;
          console.log(results);

          //for (var i = 1; i <= 4; i++) {
          //  var provider = providers[Math.floor(Math.random() * providers.length)];
          //  $scope.providers.push('provider ' + i + ': ' + provider);
          //}
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

      /*$scope.currentPage = 1;
      $scope.pageSize = 4;

      $scope.pageChangeHandler = function(num) {
        console.log('providers page changed to ' + num);
      };
*/


    }]);
