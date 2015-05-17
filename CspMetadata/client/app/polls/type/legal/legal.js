'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls.legal', {
        url: '/legal',
        templateUrl: 'app/polls/type/legal/legal.html',
        controller: 'LegalCtrl'
      });
  });



