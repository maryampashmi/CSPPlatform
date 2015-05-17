'use strict';

angular.module('cspMetadataApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
       // abstract: true, /*why when i am writing abstract true anythings is working*/
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });

/*
.state('settingss', {
  abstract: true,
  url: '/settings',
  templateUrl: 'app/settings/settings.html',
  controller: 'SettingsCtrl',
  onEnter: function($rootScope) { //what's that?
    $rootScope.title = $rootScope.titleRoot + ' | Settings';
  }
});*/
