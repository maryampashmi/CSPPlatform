'use strict';

angular.module('cspMetadataApp')
  .controller('PostCtrl',  [
      '$scope','providers','countries','$stateParams','$modal', '$log','Auth','Modal',
      function($scope,providers,countries,$stateParams,$modal, $log,Auth,Modal){
        //$scope.providers = providers.providers;
        console.log('$stateParams from post ctrl', $stateParams);
        // console.log($scope.post.provider);
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.user = Auth.getCurrentUser();


        providers.get($stateParams.providerId)
          .success(function() {
            $scope.provider = providers.current;
            console.log('current',providers.current);
          });

        //console.log($scope.provider.current);

        providers.getAllPosts($stateParams.providerId);

        // providers.getPost($scope.provider,$stateParams.post_id);
        console.log('$scope.provider',$scope.provider);



        console.log('BBEFORE PAGINATION',$scope.provider);


        //console.log('INSIDE ADD POST AND PROVIDER IS',$scope.provider);


        $scope.deletePost= Modal.confirm.delete(function (provider_id,post_id) {
          //console.log('PROVIDER',provider_id);
          // console.log('POST',post_id);
          // console.log('COMMENT',comment_id);

          providers.deletePost(provider_id,post_id)

            .success(function () {
              $scope.status = 'Deleted Post! Refreshing post list.';

              for (var i = 0; i < $scope.provider.posts.length; i++) {
                console.log($scope.provider);
                var post = $scope.provider.posts[i];
                // console.log(i,comment,comment_id)
                //console.log(comment.ID);
                if (post._id === post_id) {
                  //console.log(provider._id === provider_id)
                  // console.log(provider._id);
                  $scope.provider.posts.splice(i, 1);
                  //providers.getAllComments();
                  break;
                }
              }
              // $scope.providers = null; // i am not sure how to write  for comment as well?

            })
            .error(function (error) {
              $scope.status = 'Unable to delete comment: ' + error.message;
            });
        });

        $scope.addPost = function(){
          if(!$scope.title || $scope.title === '') { return; }
          if(!$scope.body || $scope.body === '') { return; }
          console.log('$scope.provider INSIDE addPost',$scope.provider);
          providers.createPost($scope.provider,{
            title: $scope.title,
            body: $scope.body
          });
          $scope.body = '';
          $scope.title = '';
        };

        $scope.incrementUpvotesPost = function(post) {
          console.log('UNTIL POST EVERYTHINGS IS WORKING');
          providers.upvotePost($scope.provider, post);
        };


        $scope.incrementUpvotes = function(provider) {
          providers.upvote(provider);
        };

        ///////////////////////*Using Modal Update from UI-bootstrapt*//////////////////////////////////////////

        $scope.modalUpdatePost = function (size,provider,post) {
          /*open a modal window to update a single post record*/
          console.log('inside modal update Post');
          var modalInstance = $modal.open({
            templateUrl: 'app/blog/provider/post/update_post_model.html',
            controller: function ($scope, $modalInstance){
              $scope.post = post;
              $scope.ok = function () {
                $modalInstance.close($scope.post);
              };
              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
              $scope.updatePost = function (updatedPost) {
                var post = updatedPost;

                providers.updatePost(provider,post)
                  .success(function () {
                    // providers.getAllPosts;
                    $scope.status = 'Updated post! Refreshing post list.';

                  })
                  .error(function(err, status) {
                    console.log(err);
                    console.log(status);
                  });
              };
            },
            size: size,
            resolve: {
              post: function () {
                return post;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };

        /*------using Modal from UI-bootstrap-----------------*/

        $scope.modalUpdateProvider = function (size,provider) {
          /*open a modal window to update a single provider record*/
          var modalInstance = $modal.open({
            templateUrl: 'app/blog/update_provider_model.html',

            controller: function ($scope, $modalInstance, provider){
              $scope.provider = provider;
              $scope.locations = countries.locations;
              $scope.ok = function () {
                $modalInstance.close($scope.provider);
              };
              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
              $scope.updateProvider = function (updatedProvider) {
                var provider = updatedProvider;
                providers.updateProvider(provider)
                  .success(function () {
                    providers.getAll();
                    $scope.status = 'Updated provider! Refreshing provider list.';
                  })
                  .error(function(err, status) {
                    console.log(err);
                    console.log(status);
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

      }]);
