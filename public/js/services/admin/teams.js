//Teams service used for teams REST endpoint
angular.module('mean.admin').factory("Teams", ['$resource', function($resource) {
    return $resource('admin/teams/:teamId', {
        teamId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);