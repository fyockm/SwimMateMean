angular.module('swimmate.admin').controller('MeetsController',
  ['$scope', '$routeParams', '$location', '$timeout', 'Global', 'Meets', 'Teams',
  function ($scope, $routeParams, $location, $timeout, Global, Meets, Teams) {

  $scope.global = Global;
  $scope.sort = 'date';

  $scope.add = function() {
    new Meets($scope.newMeet).$save(function(response) {
      // $location.path("admin/meets/"); //+ response._id);
      $scope.meets.push($scope.newMeet);
      $scope.newMeet = {};
    });
  };

  $scope.remove = function(meet) {
    meet.$remove();

    for (var i in $scope.meets) {
      if ($scope.meets[i] == meet) {
        $scope.meets.splice(i, 1);
      }
    }
  };

  $scope.update = function() {
    var meet = $scope.meet;
    if (!meet.updated) {
      meet.updated = [];
    }
    meet.updated.push(Date.now);

    meet.$update(function() {
      // $location.path('admin/meets/' + meet._id);
      $location.path('admin/meets/');
    });
  };

  $scope.find = function(query) {
    Meets.query(query, function(meets) {
      $scope.meets = meets;
    });
    Teams.query(query, function(teams){
      $scope.teams = teams;
    });
  };

  $scope.findOne = function(query) {
    Meets.get({
      meetId: $routeParams.meetId
    }, function(meet) {
      $scope.meet = meet;
    });
    Teams.query(query, function(teams){
      $scope.teams = teams;
    });
  };

  $scope.open = function() {
    $timeout(function() {
      $scope.opened = true;
    });
  };
}]);