'use strict';

angular.module('cspMetadataApp')
  .controller('PostCtrl',  [
      '$scope','providers' ,'countries','$stateParams','$modal', '$log','Auth','Modal','$http',
      function($scope,providers,countries,$stateParams,$modal, $log,Auth,Modal,$http){
        //$scope.providers = providers.providers;
        console.log('$stateParams from post ctrl', $stateParams);
        // console.log($scope.post.provider);
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.user = Auth.getCurrentUser();


        $scope.averageProviderRating;
        $scope.rating1 = 1;
        //$scope.rating2 = 2;
        $scope.isReadonly = true;
        $scope.rateFunction = function(rating) {
          console.log("Rating selected: " + rating);
        };


        providers.get($stateParams.providerId)
          .success(function() {
            $scope.provider = providers.current;

            $http.get('api/providers/'+$scope.provider._id+'/rating')
              .error(console.log)
              .success(function(rating){
                $scope.averageProviderRating = rating.average;
              });
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

        /**
         * Function getting called on click of rate button
         */
        $scope.rate = function () {
          $scope.isReadonly= false;
        }

        /**
         * Function getting called on click of cancel rate button
         * @param provider
         */
        $scope.cancelRate = function () {
          $scope.isReadonly= true;
        }

        /**
         * Function getting called on click of save rate button
         * @param provider
         */
        $scope.saveRate = function (provider) {
          $scope.isReadonly= true;
          providers.createRating($scope.provider,{
            author: $scope.user,
            rating : $scope.rating1,
            provider :$scope.provider,
            parameter : 'OVERALL'
          });
        }
      }])
 /* .directive("starRating", function() {
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
              filled : i < scope.ratingValue
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
          if (newVal) { updateStars(); }
        });
      }
    };
  });
*/
