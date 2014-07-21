'use strict'

angular.module('demoApp')
.controller('gamesController', ['$scope', '$location', 'accountService', 'gamesService', function($scope, $location, accountService, gamesService) {
  var user = $scope.user  = accountService.getUser();


  var loadGames = function(scope) {
    gamesService.forUser(user).then(function (games) {
      scope.games = games;
    });
  };

  loadGames($scope);

  $scope.newGame = function() {
    $location.path('/games/new').replace()
  };
}]);



