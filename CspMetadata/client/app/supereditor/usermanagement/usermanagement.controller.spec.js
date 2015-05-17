'use strict';

describe('Controller: UsermanagementCtrl', function () {

  // load the controller's module
  beforeEach(module('cspMetadataApp'));

  var UsermanagementCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsermanagementCtrl = $controller('UsermanagementCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
