'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/blog/providers/{providerId}',
        templateUrl: 'app/blog/provider/post/post.html',
        controller: 'PostCtrl'/*,
        onEnter: function($rootScope) {
          $rootScope.title = $rootScope.titleRoot + ' | Blog';
        }*/
      });
  });
