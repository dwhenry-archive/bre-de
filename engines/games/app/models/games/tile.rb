module Games
  class Tile < ActiveRecord::Base
    self.table_name = 'tiles'

    COLORS = ['white', 'black']
    VALUES = (0..9).map(&:to_s)

    belongs_to :game, class_name: 'Games::Game'
    belongs_to :player, class_name: 'Games::Player'

    validates :value, uniqueness: {
      scope: [:game, :color]
    }
    validates :position, uniqueness: {
      scope: [:game, :color]
    }
    validates :color, inclusion: COLORS
    validates :value, inclusion: VALUES

  end
end
