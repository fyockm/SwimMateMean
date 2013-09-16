//Teams service used for teams REST endpoint
window.app.factory("Teams", function($resource) {
    return $resource('admin/teams/:teamId', {
        teamId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});