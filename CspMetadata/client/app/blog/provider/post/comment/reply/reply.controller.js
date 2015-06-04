'use strict';

angular.module('cspMetadataApp')
  .controller('ReplyCtrl', [
    '$scope','providers','$stateParams','$modal', '$log','Auth','Modal',
    function($scope,providers,$stateParams,$modal, $log,Auth,Modal){
      console.log('$stateParams from reply ctrl', $stateParams);
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.user = Auth.getCurrentUser();
          //console.log($stateParams);
         /* $scope.provider=$stateParams.providerId;
          $scope.post = $stateParams.postId;*/
     // $scope.longText = "Lorem ipsum dolor sit amet, and a possibly long remaining text.Lorem ipsum dolor sit amet, and a possibly long remaining text";


          providers.getComment($stateParams.providerId,$stateParams.postId,$stateParams.commentId)
            .success(function() {
              $scope.comment = providers.current;
              console.log('providers.current',providers.current);
            });

          providers.getAllReplies($stateParams.providerId,$stateParams.postId,$stateParams.commentId);


          $scope.deleteReply= Modal.confirm.delete(function (comment_id,reply_id) {

            providers.deleteReply($stateParams.providerId,$stateParams.postId,comment_id,reply_id)

              .success(function () {
                $scope.status = 'Deleted Comment! Refreshing comment list.';

                for (var i = 0; i < $scope.comment.replies.length; i++) {
                  console.log($scope.comment);
                  var reply = $scope.comment.replies[i];

                  if (reply._id === reply_id) {

                    $scope.comment.replies.splice(i, 1);

                    break;
                  }
                }
              })
              .error(function (error) {
                $scope.status = 'Unable to delete comment: ' + error.message;
              });
          });

          $scope.addReply = function(){
           // if(!$scope.title || $scope.title === '') { return; }
            if(!$scope.body || $scope.body === '') { return; }

            providers.createReply($stateParams.providerId,$stateParams.postId, $scope.comment,{
             title: $scope.title,
              body: $scope.body
            });
            $scope.body = '';
            $scope.title = '';
          };

          $scope.incrementUpvotes = function(comment,reply) {
            console.log('REPLY CALL FROM CONTROLLER', reply);
            console.log('$SCOPE.COMMENT',comment);
            providers.upvoteReply($stateParams.providerId,$stateParams.postId,comment, reply);
          };


          ///////////////////////////*Using Modal Update from UI-bootstrapt*//////////////////////////////////////////

          $scope.modalUpdateReply = function (size,comment,reply) {
            /*open a modal window to update a single comment record*/

            console.log('FROM modalUpdateReply COMMENT is: ',comment) //This is an object
            console.log('FROM modalUpdateReply REPLY is: ',reply)

            //  var provider_id = post.provider;

           // console.log('FROM modalUpdateReply PROVIDER is',provider_id);

            var modalInstance = $modal.open({

              templateUrl: 'app/blog/provider/post/comment/reply/update_reply_model.html',
              controller: function ($scope, $modalInstance){
                $scope.reply = reply;

                $scope.ok = function () {
                  $modalInstance.close($scope.comment);
                };
                $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
                };

                $scope.updateReply = function (updatedReply) {

                  var reply = updatedReply;

                  providers.updateReply($stateParams.providerId,$stateParams.postId,comment._id,reply)
                    .success(function () {
                      // providers.getAllReplys;
                      $scope.status = 'Updated comment! Refreshing comment list.';

                    }).
                    error(function(error) {
                      alert('Unable to update comment: ' + error);
                    });
                };
              },
              size: size,
              resolve: {
                reply: function () {
                  return reply;
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

