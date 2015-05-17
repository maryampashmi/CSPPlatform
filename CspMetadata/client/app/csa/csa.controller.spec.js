'use strict';

describe('Controller: CsaCtrl', function () {

  // load the controller's module
  beforeEach(module('cspMetadataApp'));

  var CsaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CsaCtrl = $controller('CsaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
