'use strict';

angular.module('cspMetadataApp')
  .controller('SupereditorCtrl', function($scope, $mdSidenav, $timeout, $log) {
    $scope.sections = [
      {
        title: 'Settings',
        icon: 'fa-cog',
        link: 'supereditor.settings'
      },
      {
        title: 'User Management',
        icon: 'fa-user',
        link: 'supereditor.usermanagement'
      }
    ];

    $scope.toggleLeft = function () {
      $mdSidenav('left').toggle()
        .then(function () {
          //$log.debug("toggle left is done");
        });
    };
  })
  .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('left').close()
        .then(function(){
          //$log.debug("close LEFT is done");
        });
    };
  });

