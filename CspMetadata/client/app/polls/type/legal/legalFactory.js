'use strict';

/**
 * @ngdoc service
 * @name questionModule.legalFactory
 * @description
 * # legalFactory
 * Factory in the questionModule.
 */
angular.module('cspMetadataApp')
  .factory('legal', ['$http',function($http){
  var o = {
   current: {},
   questions: [
      {
        "_id":      1,
        "question": "AngularJS is written completely in JavaScript.",
        "type":     "True-false",
        "answer":   true
      },
      {
        "_id":      2,
        "question": "AngularJS 1.0 was released in 2013.",
        "type":     "True-false",
        "answer":   false
      },
      {
        "_id":      3,
        "question": "AngularJS is best defined as a framework.",
        "type":     "True-false",
        "answer":   true
      },
      {
        "_id":      4,
        "question": "What does the acronym 'MVC' stand for?",
        "type":     "Multiple choice",
        "choices":  [
          {
            "_id":    1,
            "choice": "Method, Variable, Constant"
          },
          {
            "_id":    2,
            "choice": "Module, View, Constraint"
          },
          {
            "_id":    3,
            "choice": "Model, View, Controller"
          },
          {
            "_id":    4,
            "choice": "None of the above"
          }
        ],
        "answer":   3
      },
      {
        "_id":      5,
        "question": "Who maintains the AngularJS open-source project?",
        "type":     "Multiple choice",
        "choices":  [
          {
            "_id":    1,
            "choice": "Yahoo!"
          },
          {
            "_id":    2,
            "choice": "Google"
          },
          {
            "_id":    3,
            "choice": "AngularJS.org"
          },
          {
            "_id":    4,
            "choice": "Microsoft"
          }
        ],
        "answer":   2
      },
      {
        "_id":      6,
        "question": "In what year was AngularJS initially released?",
        "type":     "Multiple choice",
        "choices":  [
          {
            "_id":    1,
            "choice": "2009"
          },
          {
            "_id":    2,
            "choice": "2012"
          },
          {
            "_id":    3,
            "choice": "2006"
          },
          {
            "_id":    4,
            "choice": "2014"
          }
        ],
        "answer":   1
      }
    ]
  };
  return o;
}]);
