// Assignments service used for assignments REST endpoint
angular.module('swimmate').factory("Assignments", ['$resource', function($resource) {
  return $resource('assignments/:assignmentId', {
    teamId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);