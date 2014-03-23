'use strict'

angular.module('demoApp')
.controller('gamesController', ['$scope', 'accountService', function($scope, accountService) {
  $scope.user = accountService.getUser();

  $scope.games = [{
    id: 123,
    status: 'pending',
    players: [
      { name: 'Fred', id: 123 },
      { name: 'John', id: 234 },
    ]
  }, {
    id: 222,
    status: 'running',
    players: [
      { name: 'Alex', id: 235 },
      { name: 'John', id: 234 },
    ]
  }]
}])



