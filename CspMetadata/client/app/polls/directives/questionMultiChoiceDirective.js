'use strict';

/**
 * @ngdoc directive
 * @name questionModule.directive:questionMultiChoiceDirective
 * @description
 * # questionMultiChoiceDirective
 */
angular.module('cspMetadataApp')
  .directive('questionMultichoice', function () {
    return {
      scope:       {
        filterBy: '='
      },
      restrict:    'E',
      templateUrl: '/polls/partials/question-multi-choice.html'
    };
  });
