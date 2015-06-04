'use strict';

angular.module('cspMetadataApp')
  .controller('CommentCtrl',  [
    '$scope','providers','$stateParams','$modal', '$log','Auth','Modal',
    function($scope,providers,$stateParams,$modal, $log,Auth,Modal){

      console.log('$stateParams from comment ctrl', $stateParams);
      $scope.provider = $stateParams.providerId;

      console.log('$scope.provider from comment ctrl', $scope.provider);

      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.user = Auth.getCurrentUser();

      providers.getPost($stateParams.providerId,$stateParams.postId)
        .success(function() {
          $scope.post = providers.current;
          console.log('current',providers.current);
                  });

    providers.getAllComments($stateParams.providerId,$stateParams.postId);

      $scope.deleteComment= Modal.confirm.delete(function (post_id,comment_id) {

        providers.deleteComment($stateParams.providerId,post_id,comment_id)

          .success(function () {
            $scope.status = 'Deleted Comment! Refreshing comment list.';

            for (var i = 0; i < $scope.post.comments.length; i++) {
              console.log($scope.post);
              var comment = $scope.post.comments[i];

              if (comment._id === comment_id) {

                $scope.post.comments.splice(i, 1);

                break;
              }
            }
          })
          .error(function (error) {
            $scope.status = 'Unable to delete comment: ' + error.message;
          });
      });

      $scope.addComment = function(){
        // if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.body || $scope.body === '') { return; }
        console.log('$scope.provider INSIDE addComment',$scope.provider);
        console.log('$scope.post INSIDE addComment',$scope.post);
        providers.createComment($stateParams.providerId, $scope.post,{
         title: $scope.title,
         body: $scope.body
        });
        $scope.body = '';
        $scope.title = '';
      };

      $scope.incrementUpvotes = function(comment) {
        console.log('COMMENT CALL FROM CONTROLLER', comment);
        console.log('$SCOPE.POST',$scope.post);
        providers.upvoteComment($stateParams.providerId,$scope.post, comment);
      };

          ///////////////////////*Using Modal Update from UI-bootstrapt*//////////////////////////////////////////

          $scope.modalUpdateComment = function (size,post,comment) {
            /*open a modal window to update a single comment record*/

            console.log('FROM modalUpdateComment COMMENT is: ',comment)
            console.log('FROM modalUpdateComment POST is: ',post)

            var modalInstance = $modal.open({
              templateUrl: 'app/blog/provider/post/comment/update_comment_model.html',
              controller: function ($scope, $modalInstance){
                $scope.comment = comment;

                $scope.ok = function () {
                $modalInstance.close($scope.comment);
                };
                $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
                };
                $scope.updateComment = function (updatedComment) {
                  console.log('FROM FUNCTION INSIDE CONTROLLER INSIDE modalUpdateComment COMMENT is',updatedComment)
                  var comment = updatedComment;

                  console.log('call from updatePost FUNC for POST',post);
                  console.log('call from updatePost FUNC for COMMENT',comment);
                 console.log('$stateParams.providerId', $stateParams.providerId);

                  providers.updateComment($stateParams.providerId,post,comment)
                    .success(function () {
                      // providers.getAllComments;
                      $scope.status = 'Updated comment! Refreshing comment list.';

                    }).
                    error(function(error) {
                      alert('Unable to update comment: ' + error);
                    });
                };

              },
              size: size,
              resolve: {
                comment: function () {
                  return comment;
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





/*'$scope','providers','$stateParams','$modal', '$log','Auth',
 function($scope,providers,$stateParams,$modal, $log,Auth){
 //console.log("-->")
 //console.log("Received params: ", $stateParams)
 providers.getPost($stateParams.provider_id, $stateParams.post_id).success(function(){
 $scope.post = providers.current;
 console.log($scope.post);
 });
 $scope.isLoggedIn = Auth.isLoggedIn;
 var provider_id = $stateParams.provider_id;
 var  post_id = $stateParams.post_id;
 //console.log('CALL FROM OUTSIDE FUNCTION PROVIDER',provider_id);
 //console.log('CALL FROM OUTSIDE FUNCTION POST',post_id);

 $scope.deleteComment= function (comment_id) {
 //console.log('PROVIDER',provider_id);
 // console.log('POST',post_id);
 // console.log('COMMENT',comment_id);
 providers.deleteComment(provider_id,post_id,comment_id)

 .success(function () {
 $scope.status = 'Deleted Provider! Refreshing post list.';

 for (var i = 0; i < $scope.post.comments.length; i++) {
 var comment = $scope.post.comments[i];
 // console.log(i,comment,comment_id)
 //console.log(comment.ID);
 if (comment._id === comment_Id) {
 //console.log(post._id === post_id)
 // console.log(post._id);
 $scope.post.comments.splice(i, 1);
 //providers.getAllComments();
 break;
 }
 }
 // $scope.posts = null; // i am not sure how to write  for comment as well?

 })
 .error(function (error) {
 $scope.status = 'Unable to delete comment: ' + error.message;
 });
 };

 $scope.addComment = function(){
 // if(!$scope.title || $scope.title === '') { return; }
 if(!$scope.body || $scope.body === '') { return; }

 providers.createComment($stateParams.provider_id, $stateParams.post_id,{
 //title: $scope.title,
 body: $scope.body
 }).success(function(data){
 providers.getPost($stateParams.provider_id, $stateParams.post_id).success(function(){
 $scope.post = providers.current;
 });
 });
 $scope.body = '';
 $scope.title = '';
 };



 $scope.incrementUpvotes = function(comment){
 providers.upvoteComment($stateParams.provider_id, $scope.post._id, comment);
 };*/
