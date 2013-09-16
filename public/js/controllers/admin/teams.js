function TeamsController($scope, $routeParams, $location, Global, Teams) {
    $scope.global = Global;

    $scope.create = function() {
        var team = new Teams({
            name: this.name,
            mascot: this.mascot
        });
        team.$save(function(response) {
            $location.path("admin/teams/" + response._id);
        });

        this.name = "";
        this.mascot = "";
    };

    $scope.remove = function(team) {
        team.$remove();

        for (var i in $scope.teams) {
            if ($scope.teams[i] == team) {
                $scope.teams.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var team = $scope.team;
        if (!team.updated) {
            team.updated = [];
        }
        team.updated.push(new Date().getTime());

        team.$update(function() {
            $location.path('admin/teams/' + team._id);
        });
    };

    $scope.find = function(query) {
        Teams.query(query, function(teams) {
            $scope.teams = teams;
        });
    };

    $scope.findOne = function() {
        Teams.get({
            teamId: $routeParams.teamId
        }, function(team) {
            $scope.team = team;
        });
    };
}