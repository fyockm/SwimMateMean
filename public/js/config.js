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
    when('/admin/meets', {
        templateUrl: 'views/admin/meets/list.html'
    }).
    when('/admin/meets/:meetId', {
        templateUrl: 'views/admin/meets/view.html'
    }).
    when('/admin/roster', {
        templateUrl: 'views/admin/roster/list.html'
    }).
    when('/admin/roster/:rosterId', {
        templateUrl: 'views/admin/roster/view.html'
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