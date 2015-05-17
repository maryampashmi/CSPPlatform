'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls.privacy', {
        url: '/privacy',
        templateUrl: 'app/polls/type/privacy/privacy.html',
        controller: 'PrivacyCtrl'
      });
  });
