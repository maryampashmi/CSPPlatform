'use strict';

/**
 * @ngdoc directive
 * @name questionModule.directive:questionTrueFalseDirective
 * @description
 * # questionTrueFalseDirective
 */
angular.module('cspMetadataApp')
  .directive('questionTruefalse', function () {
    return {
      scope:       {
        filterBy: '='
      },
      restrict:    'E',
      templateUrl: '/polls/partials/question-true-false.html'
    };
  });
