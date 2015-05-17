'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('comment', {
        url: '/blog/providers/{providerId}/posts/{postId}',
        templateUrl: 'app/blog/provider/post/comment/comment.html',
        controller: 'CommentCtrl'
      });
  });
