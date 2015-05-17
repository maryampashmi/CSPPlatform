'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.usermanagement', {
        url: '/usermanagement',
        templateUrl: 'app/admin/usermanagement/usermanagement.html',
        controller: 'UsermanagementCtrl'
      });
  });
