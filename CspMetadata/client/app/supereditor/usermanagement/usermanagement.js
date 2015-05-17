'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('supereditor.usermanagement', {
        url: '/usermanagement',
        templateUrl: 'app/supereditor/usermanagement/usermanagement.html',
        controller: 'UsermanagementCtrl'
      });
  });
