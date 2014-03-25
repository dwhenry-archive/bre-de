

angular.module('demoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'login'
   })
  .when('/games',{
    templateUrl: 'games',
    controller: 'gamesController'
   })
  .when('/games/new',{
    templateUrl: 'new_game',
    controller: 'gameController'
  })
  .when('/games/:id', {
    templateUrl: 'game',
    controller: 'gameController'
   })
  .otherwise({
    redirectTo: '/'
   })
})