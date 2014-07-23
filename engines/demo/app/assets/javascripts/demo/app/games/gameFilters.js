'use strict'

angular.module('demoFilters', [])
  .filter('inCurrentGame', ['accountService', function (accountService) {
    var user = accountService.getUser();
    var gamesToFilter;
    var filteredGames;

    return function (games) {
      if(games.length == 0)
        return games
      else if(gamesToFilter == games) {
        return filteredGames;
      } else {
        gamesToFilter = games;
        filteredGames = [];

        $.each(games, function (i, game) {
          var inGame = !!$.each(game.players, function (i, player) {
            return player.id == user.id
          });
          if (inGame) filteredGames.push(game)
        });

        return filteredGames;
      }
    };
  }])
  .filter('canJoinGame', ['accountService', function (accountService) {
    var user = accountService.getUser();
    var gamesToFilter;
    var filteredGames;

    return function (games) {
      if (games.length == 0)
        return games
      else if (gamesToFilter == games) {
        return filteredGames;
      } else {
        gamesToFilter = games;
        filteredGames = [];

        $.each(games, function (i, game) {
          var inGame = !!$.each(game.players, function (i, player) {
            return player.id == user.id
          });
          if (!inGame) filteredGames.push(game)
        });

        return filteredGames;
      }
    };
  }]);
