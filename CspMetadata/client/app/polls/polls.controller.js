'use strict';

angular.module('cspMetadataApp')
  .controller('PollsCtrl', function($scope, $mdSidenav, $timeout, $log) {
    $scope.sections = [
      {
        title: 'Legal',
        icon: 'fa-home',
        link: 'polls.legal'
      }, {
        title: 'Privacy',
        icon: 'fa-user',
        link: 'polls.privacy'
      }, {
        title: 'Security',
        icon: 'fa-photo',
        link: 'polls.security'
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

