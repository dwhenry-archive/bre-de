'use strict'

angular.module('demoApp')
.controller('gamesController', ['$scope', '$location', 'accountService', 'gamesService', function($scope, $location, accountService, gamesService) {
  var user = $scope.user  = accountService.getUser();


  var loadGames = function(scope) {
    gamesService.forUser(user).then(function (data) {
      scope.games = data.games;
    });
  };

  loadGames($scope);

  $scope.newGame = function() {
    $location.path('/games/new').replace()
  };
}]);



