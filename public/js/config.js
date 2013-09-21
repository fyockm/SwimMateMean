//Setting up route
window.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/admin/teams', {
        templateUrl: 'views/admin/teams/list.html'
    }).
    when('/admin/teams/create', {
        templateUrl: 'views/admin/teams/create.html'
    }).
    when('/admin/teams/:teamId/edit', {
        templateUrl: 'views/admin/teams/edit.html'
    }).
    when('/admin/teams/:teamId', {
        templateUrl: 'views/admin/teams/view.html'
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