angular.module('swimmate.admin').controller('EventsController',
  ['$scope', '$routeParams', '$location', 'Global', 'Events',
  function ($scope, $routeParams, $location, Global, Events) {

  $scope.global = Global;
  $scope.sort = 'number';

  $scope.add = function() {
    new Events($scope.newEvent).$save(function(response) {
      // $location.path("admin/events/"); //+ response._id);
      $scope.events.push($scope.newEvent);
      $scope.newEvent = {};
    });
  };

  $scope.remove = function(event) {
    event.$remove();

    for (var i in $scope.events) {
      if ($scope.events[i] == event) {
        $scope.events.splice(i, 1);
      }
    }
  };

  $scope.update = function() {
    var event = $scope.event;
    if (!event.updated) {
      event.updated = [];
    }
    console.log(event);
    event.updated.push(new Date().getTime());

    event.$update(function() {
      // $location.path('admin/events/' + event._id);
      $location.path('admin/events/');
    });
  };

  $scope.find = function() {
    Events.query(function(events) {
      $scope.events = events;
    });
  };

  $scope.findOne = function() {
    Events.get({
      eventId: $routeParams.eventId
    }, function(event) {
      $scope.event = event;
    });
  };
}]);