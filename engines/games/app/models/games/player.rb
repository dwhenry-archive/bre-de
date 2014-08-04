module Games
  class Player < ActiveRecord::Base
    self.table_name = 'players'

    belongs_to :game, class_name: Games::Game, inverse_of: :players
    belongs_to :user, class_name: Games::User

    validates :user_id, uniqueness: { scope: :game_id }

    STATES = [
      PENDING = 'pending',
      WAITING = 'waiting',
      PICK_INIT_TILES = 'pick_init_tiles',
      PICK_TILE = 'pick_tile',
      GUESS_PIECE = 'guess_piece',
      PICK_TILE_OR_PASS = 'pick_tile_or_pass',
    ]

  end
end
