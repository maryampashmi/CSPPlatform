'use strict';

angular.module('cspMetadataApp')
  .controller('PollsCtrl', function($scope, $mdSidenav, $timeout, $log, Auth) {
    $scope.sections = [
      {
        title: 'Legal',
        icon: 'fa-home',
        link: 'polls.legal',
        permission:["editor", "admin"]
      }, {
        title: 'Privacy',
        icon: 'fa-cogs',
        link: 'polls.privacy',
        permission:["editor", "admin"]
      }, {
        title: 'Security',
        icon: 'fa-photo',
        link: 'polls.security',
        permission:["user"]
      }, {
        title: 'Customer Survey',
        icon: 'fa-user',
        link: 'polls.survey',
        permission:["user"]
      }
    ];

    $scope.checkIfUserIsAllow = function(rolesAllowed){
      console.log("Allowed roles: ", rolesAllowed)
      var userRole = Auth.getCurrentUser().role

      if(rolesAllowed.indexOf(userRole) > -1){
        return true;
      }else{
        return false;
      }
    }
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

