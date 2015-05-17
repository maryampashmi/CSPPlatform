'use strict';

angular.module('cspMetadataApp')
  .config(function($stateProvider) {
    $stateProvider
       .state('admin', {
        /*abstract: true,*/
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        onEnter: function($rootScope) {
        $rootScope.title = $rootScope.titleRoot + ' | Admin';
        }
      });
  });
