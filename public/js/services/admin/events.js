//Events service used for events REST endpoint
angular.module('swimmate.admin').factory("Events", ['$resource', function($resource) {
  return $resource('admin/events/:eventId', {
    eventId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);