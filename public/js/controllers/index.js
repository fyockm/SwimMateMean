angular.module('swimmate.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;
  $scope.awesomeThings = [
    'Teams',
    'Meets',
    'Rosters'
  ];
}]);