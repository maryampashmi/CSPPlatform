'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls', {
        url: '/polls',
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl',
        onEnter: function($rootScope) {
          $rootScope.title = $rootScope.titleRoot + ' | Poll';
        }
      });

  });
