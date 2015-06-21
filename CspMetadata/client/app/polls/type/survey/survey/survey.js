'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polls.survey', {
        url: '/survey',
        templateUrl: 'app/polls/type/survey/survey/survey.html',
        controller: 'SurveyCtrl'
      });
  });
