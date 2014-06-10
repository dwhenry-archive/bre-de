module Games
  class Player < ActiveRecord::Base
    self.table_name = 'players'

    belongs_to :game, class_name: Games::Game
    belongs_to :user, class_name: Games::User

    STATES = [
      PENDING = 'pending'
    ]

  end
end
