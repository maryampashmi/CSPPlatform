'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rating', {
        url: '/blog/providers/{providerId}',
        templateUrl: 'app/blog/provider/rating/rating.html',
        controller: 'RatingCtrl'
      });
  });
