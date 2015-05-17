'use strict';

/**
 * @ngdoc directive
 * @name questionModule.directive:questionMultiChoiceDirective
 * @description
 * # questionMultiCorrectDirective
 */
angular.module('cspMetadataApp')
  .directive('questionMulticorrect', function () {
    return {
      scope:       {
        filterBy: '='
      },
      restrict:    'E',
      templateUrl: '/polls/partials/question-multi-correct.html'
    };
  });
