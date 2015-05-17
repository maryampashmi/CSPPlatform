'use strict';

angular.module('cspMetadataApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },
      /*{
        'title': 'Blog',
        'link': '/blog/providers'
      },*/
      {
        'title': 'Cloud Security Alliance',
        'link': '/csa'
      },
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;              /*system administrator in general can be max 3 person in whole system*/
    $scope.isSuperEditor = Auth.isSuperEditor; /*Company Admin who is responsible to add user from inside company*/
    $scope.isEditor = Auth.isEditor;           /*person inside company who is responsible to edit posts...*/
    $scope.isUser = Auth.isUser;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
