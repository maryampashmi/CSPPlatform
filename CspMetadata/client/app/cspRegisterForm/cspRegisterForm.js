'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cspRegisterForm', {
        url: '/{providerId}/cspRegisterForm',
        templateUrl: 'app/cspRegisterForm/cspRegisterForm.html',
        controller: 'CspRegisterFormCtrl'
      });
  });