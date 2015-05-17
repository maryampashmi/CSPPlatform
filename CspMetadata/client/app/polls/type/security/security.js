'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls.security', {
        url: '/security',
        templateUrl: 'app/polls/type/security/security.html',
        controller: 'SecurityCtrl'
      });
  });
