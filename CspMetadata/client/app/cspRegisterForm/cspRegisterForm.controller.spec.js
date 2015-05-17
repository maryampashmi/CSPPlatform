'use strict';

describe('Controller: CspRegisterFormCtrl', function () {

  // load the controller's module
  beforeEach(module('cspMetadataApp'));

  var CspRegisterFormCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CspRegisterFormCtrl = $controller('CspRegisterFormCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
