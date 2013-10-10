//Meets service used for meets REST endpoint
angular.module('swimmate.admin').factory("Meets", ['$resource', function($resource) {
  return $resource('admin/meets/:meetId', {
    meetId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);