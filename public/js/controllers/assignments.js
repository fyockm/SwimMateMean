angular.module('swimmate').controller('AssignmentsController',
  ['$scope', '$routeParams', '$location', 'Global', 'Assignments', 'Events', 'Meets', 'Roster',
  function ($scope, $routeParams, $location, Global, Assignments, Events, Meets, Roster) {

  $scope.global = Global;
  $scope.sort = 'number';
  $scope.assignments = Assignments.query();

  Meets.query(function(meets){
    $scope.meets = meets;
  });
  Roster.query(function(roster){
    $scope.roster = roster;
  });
  Events.query(function(events){
    $scope.assignments.events = events;
  });

  $scope.add = function() {
    new Assignments($scope.newAssignment).$save(function(response) {
      $scope.assignments.push($scope.newAssignment);
      $scope.newAssignment = {};
    });
  };

  $scope.remove = function(assignment) {
    assignment.$remove();

    for (var i in $scope.assignments) {
      if ($scope.assignments[i] == assignment) {
        $scope.assignments.splice(i, 1);
      }
    }
  };

  $scope.update = function() {
    var assignment = $scope.assignment;
    if (!assignment.updated) {
      assignment.updated = [];
    }
    console.log(assignment);
    assignment.updated.push(new Date().getTime());

    assignment.$update(function() {
//      $location.path('assignments/');
    });
  };

  $scope.find = function() {
    Assignments.query(function(assignments) {
      $scope.assignments = assignments;
    });
  };

  $scope.findOne = function() {
    Assignments.get({
      assignmentId: $routeParams.assignmentId
    }, function(assignment) {
      $scope.assignment = assignment;
    });
  };
}]);