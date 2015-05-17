'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('supereditor', {
        url: '/supereditor',
        templateUrl: 'app/supereditor/supereditor.html',
        controller: 'SupereditorCtrl'
      });
  });
