= Games API

== GET /games

Returns a index of the current games for a user

Arguments:

* name: Option string of the user name^
* email: Option string of the user email^
* token: User token
* filter: String value to determine which games should be returned =>
  * for: Lists games the user is currently active in
  * waiting: Lists games that are pending and the user can join

Return data format:

JSON array of games items each with the following data:

* id: The ID of the game
* status: The current status of the game (pending/..)
* stats: dependant on state =>
  * pending: The number of players joined verse the required number of players
* players: String containing the names of the players in the game

== POST /games

Create a new game of the user

Arguments:

* name: Option string of the user name^
* email: Option string of the user email^
* token: User token
* max_player: Number of players required to start the game

Return data format:

JSON object representing the newly created game with the following data:

* id: The ID of the game

--------

^ At least one of name or email is required
