'use strict';

describe('Controller: SupereditorCtrl', function () {

  // load the controller's module
  beforeEach(module('cspMetadataApp'));

  var SupereditorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupereditorCtrl = $controller('SupereditorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
