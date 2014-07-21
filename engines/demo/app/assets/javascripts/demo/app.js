angular.module('demoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login'
      })

      // Login
      .when('/login', {
        templateUrl: 'login'
      })
      .when('/logout', {
        templateUrl: 'login',
        controller: 'logoutController'
      })
      .when('/signup', {
        templateUrl: 'signup',
      })

      // Games
      .when('/games', {
        templateUrl: 'games',
        controller: 'gamesController'
      })
      .when('/games/new', {
        templateUrl: 'new_game',
        controller: 'newGameController'
      })
      .when('/games/:id', {
        templateUrl: 'game',
        controller: 'newGameController'
      })
      .when('/games/:id/join', {
        templateUrl: 'waiting',
        controller: 'joinGameController'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
