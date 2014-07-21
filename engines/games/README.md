# Games API

## GET '/games'

Returns a index of the current games for a user

### Arguments:

* **Auth Details^^**
* **filter**: String value to determine which games should be returned =>
  * **for**: Lists games the user is currently active in
  * **waiting**: Lists games that are pending and the user can join

### Return data format:

JSON array of games items each with the following data:

* **id**: The ID of the game
* **status**: The current status of the game (pending/..)
* **stats**: dependant on state =>
  * **pending**: The number of players joined verse the required number of players
* **players**: String containing the names of the players in the game

## POST '/games'

Create a new game of the user

### Arguments:

* **Auth Details^^**
* **max_player**: Number of players required to start the game

### Return data format:

JSON object representing the newly created game with the following data:

* **id**: The ID of the game

## PUT '/game/:id'

### Arguments:

* **Auth Details^^**

### Return data format:

JSON object representing the newly created game with the following data:

* **id** The game id
* **errors** array containing a list of any errors that occurred during the add player process



* **User is already a player in this game**
* **Game already has required number of player**
* **Game player assignment error. We are currently unable to determine the exact number of players in the game.  Please refresh and try again**
* **This was unexpected.. Please try that again..** - This will occur is that is an issue at the database level with adding the new player

Adds the current user to the game
--------

^ At least one of name or email is required
^^ Auth details =>
  * **name**: Option string of the user name^
  * **email**: Option string of the user email^
  * **token**: User token
