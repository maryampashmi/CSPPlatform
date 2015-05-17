'use strict';

angular.module('cspMetadataApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('admin.settings', {
                url: '/settings',
                templateUrl: 'app/admin/blogSettings/blogSettings.html',
                controller: 'BlogsettingsCtrl'
            });
    });
