'use strict';

angular.module('cspMetadataApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('supereditor.settings', {
                url: '/settings',
                templateUrl: 'app/supereditor/siteSettings/siteSettings.html',
                controller: 'SitesettingsCtrl'
            });
    });
