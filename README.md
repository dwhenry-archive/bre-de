* Bre-de

This is the back end implementation of the co(de) (bre)aker game.

** RULES:

Place all game pieces face down on the table and shuffle
Each player takes X number of pieces (X is dependant on the number of players)
The pieces must be arranged in order of number independant of colour.

Starting with the first player, each player takes a chip from the table.
They then must guess a piece from one of the other players.
If they guess incorrect the player must show his piece.
If they guess correctly the other player must either show the piece. The player then has the options of:

- adding there new piece to their hidden pieces.
- guessing another the number of another players piece (from here the result is the same as the first guess)

## TODO:

The following functionality still needs to be added:

- Implement the player matching engine so that users can:
  - Create a new game and wait for players to join
  - Join an existing game
  - Invite fiends to play a game (need to implement friends first)
- Implement the game engine so that players can:
  - request the current state of the game
  - play a turn if it is the go at the game
  - request the moves played so far within the game
  - identify when a game has been won
- Implement a stats engine so that players can:
  - request there win/lose stats
  - track their record again friends (need to implement friends first)
- Implement friends functionality?
- Implement notification engine so that:
  - players are notified when it is their turn
  - players are notified after X time without move has elapsed
- Create template for creating game bots which can then be played again
