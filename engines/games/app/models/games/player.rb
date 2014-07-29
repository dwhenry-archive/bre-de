module Games
  class Player < ActiveRecord::Base
    self.table_name = 'players'

    belongs_to :game, class_name: Games::Game, inverse_of: :players
    belongs_to :user, class_name: Games::User

    validates :user_id, uniqueness: { scope: :game_id }

    STATES = [
      PENDING = 'pending'
    ]

  end
end
