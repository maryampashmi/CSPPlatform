'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/blog/providers',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl'/*,
        onEnter: function($rootScope) {
          $rootScope.title = $rootScope.titleRoot + ' | Blog';
        }*/
      });
  });



