//Roster service used for rosters REST endpoint
angular.module('swimmate.admin').factory("Roster", ['$resource', function($resource) {
  return $resource('admin/roster/:rosterId', {
    rosterId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);