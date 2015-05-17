'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reply', {
        url: '/blog/providers/{providerId}/posts/{postId}/comments/{commentId}',
        templateUrl: 'app/blog/provider/post/comment/reply/reply.html',
        controller: 'ReplyCtrl'
      });
  });



