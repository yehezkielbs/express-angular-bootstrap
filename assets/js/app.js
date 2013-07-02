var App = angular.module('App', ['SampleServices']);

App.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/samples', {
      templateUrl: 'partials/samples/index',
      controller: samples.ListCtrl
    }).
    when('/samples/new', {
      templateUrl: 'partials/samples/new',
      controller: samples.NewCtrl
    }).
    when('/samples/:id', {
      templateUrl: 'partials/samples/show',
      controller: samples.ShowCtrl
    }).
    when('/samples/:id/edit', {
      templateUrl: 'partials/samples/edit',
      controller: samples.ShowCtrl
    }).
    otherwise({
      redirectTo: '/samples'
    });
}]);
