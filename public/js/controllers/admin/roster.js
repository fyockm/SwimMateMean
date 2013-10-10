angular.module('swimmate.admin').controller('RosterController',
  ['$scope', '$routeParams', '$location', 'Global', 'Roster',
  function ($scope, $routeParams, $location, Global, Roster) {

  $scope.global = Global;
  $scope.sort = 'number';

  $scope.add = function() {
    new Roster($scope.newRoster).$save(function(response) {
      // $location.path("admin/roster/"); //+ response._id);
      $scope.roster.push($scope.newRoster);
      $scope.newRoster = {};
    });
  };

  $scope.remove = function(roster) {
    console.log(roster);
    roster.$remove();

    for (var i in $scope.roster) {
      if ($scope.roster[i] == roster) {
        $scope.roster.splice(i, 1);
      }
    }
  };

  $scope.update = function() {
    var roster = $scope.roster;
    if (!roster.updated) {
      roster.updated = [];
    }
    console.log(roster);
    roster.updated.push(new Date().getTime());

    roster.$update(function() {
      // $location.path('admin/roster/' + roster._id);
      $location.path('admin/roster/');
    });
  };

  $scope.find = function(query) {
    Roster.query(query, function(roster) {
      $scope.roster = roster;
    });
  };

  $scope.findOne = function() {
    Roster.get({
      rosterId: $routeParams.rosterId
    }, function(roster) {
      $scope.roster = roster;
    });
  };
}]);