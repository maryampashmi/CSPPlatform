'use strict';

angular.module('cspMetadataApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ngMaterial',
  "ngTextTruncate",
  'd3-multi-parent',
  'formly',
  'formlyBootstrap'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,formlyConfigProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    formlyConfigProvider.setType([
      {
        name: 'multi-checkbox',
        templateUrl: 'multi-checkbox-template.html',
        wrapper: ['bootstrapLabel', 'bootstrapHasError']
      },{
        name: 'well-multi-checkbox',
        templateUrl: 'well-multi-checkbox-template.html',
        wrapper: ['bootstrapLabel', 'bootstrapHasError']
      },{
        name: 'well-text',
        templateUrl: 'well-text.html',
        wrapper: ['bootstrapHasError']
      }/*,{
       name: 'well-number',
       templateUrl: 'well-number.html',
       wrapper: ['bootstrapLabel', 'bootstrapHasError']
       }*/
    ]);
    /*formlyConfigProvider.setTemplateUrl('multi-checkbox', './polls/partials/multi-checkbox-template.html');
     formlyConfigProvider.setTemplateUrl('well-multi-checkbox', './polls/partials/well-multi-checkbox-template.html');
     formlyConfigProvider.setTemplateUrl('well-text', './polls/partials/well-text.html');
     formlyConfigProvider.setTemplateUrl('well-number', './polls/partials/well-number.html');
     formlyConfigProvider.setTemplateUrl('section-title', './polls/partials/section-title.html');*/


  })


  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })
/*.run(function(formlyConfigProvider) {
 formlyConfigProvider.setType(
 {
 name: 'multi-checkbox',
 templateUrl: './polls/partials/multi-checkbox-template.html'
 },{
 name: 'well-multi-checkbox',
 templateUrl: './polls/partials/well-multi-checkbox-template.html'
 },{
 name: 'well-text',
 templateUrl: './polls/partials/well-text.html'
 },{
 name: 'well-number',
 templateUrl: './polls/partials/well-number.html'
 }
 );
 });
 */
