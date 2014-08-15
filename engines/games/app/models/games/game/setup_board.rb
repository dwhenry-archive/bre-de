module Games
  class Game
    class SetupBoard < SimpleDelegator
      def init
        ActiveRecord::Base.transaction do
          game_tiles = Games::Tile::COLORS.product(Games::Tile::VALUES).sort_by { rand }
          game_tiles.each_with_index do |(color, value), position|
            tiles.create!(color: color, value: value, position: position)
          end

          update_attributes!(status: Games::Game::INITIALIZE)
        end
        true
      end
    end
  end
end
