'use strict';

describe('Controller: SitesettingsCtrl', function() {

    // load the controller's module
    beforeEach(module('cspMetadataApp'));

    var SitesettingsCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        SitesettingsCtrl = $controller('SitesettingsCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function() {
        expect(1).toEqual(1);
    });
});
