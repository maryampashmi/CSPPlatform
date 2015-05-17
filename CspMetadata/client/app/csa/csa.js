'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('csa', {
        url: '/csa',
        templateUrl: 'app/csa/csa.html',
        controller: 'CsaCtrl'
      });
  });