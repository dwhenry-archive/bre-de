'use strict'

angular.module('demoFilters', [])
  .filter('inCurrentGame', ['accountService', function (accountService) {
    var user = accountService.getUser();
    var filteredGames;

    return _.memoize(function (games) {
      filteredGames = [];

      $.each(games, function (i, game) {
        var inGame = false;
        $.each(game.players, function (i, player) {
          if(player.id == user.id) inGame = true;
        });

        if (inGame) filteredGames.push(game)
      });

      return filteredGames;
    }, JSON.stringify
    )
  }])
  .filter('canJoinGame', ['accountService', function (accountService) {
    var user = accountService.getUser();
    var filteredGames;

    return _.memoize(function (games) {
      filteredGames = [];

      $.each(games, function (i, game) {
        var inGame = false;
        $.each(game.players, function (i, player) {
          if (player.id == user.id) inGame = true;
        });
        if (!inGame) filteredGames.push(game)
      });

      return filteredGames;
    }, JSON.stringify
    )
  }]);
