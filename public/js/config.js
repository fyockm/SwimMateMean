//Setting up route
window.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/admin/teams', {
        templateUrl: 'views/admin/teams/list.html'
    }).
    when('/admin/teams/:teamId', {
        templateUrl: 'views/admin/teams/view.html'
    }).
    when('/admin/events', {
        templateUrl: 'views/admin/events/list.html'
    }).
    when('/admin/events/:eventId', {
        templateUrl: 'views/admin/events/view.html'
    }).
    when('/', {
        templateUrl: 'views/index.html'
    }).
    otherwise({
        redirectTo: '/'
    });
  }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix("!");
  }
]);