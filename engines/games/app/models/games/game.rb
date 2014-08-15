module Games
  class Game < ActiveRecord::Base
    self.table_name = 'games'

    INIT_TILE_COUNT = 4

    belongs_to :creator, class_name: 'Games::User'
    has_many :players, class_name: 'Games::Player', inverse_of: :game
    has_many :tiles, class_name: 'Games::Tile', inverse_of: :game

    validate :number_of_players

    STATES = [
      PENDING = 'pending',
      INITIALIZE = 'initialize',
    ]

    def execute_command(command, user)
      case command
        when 'add_player'
          Games::Game::AddPlayer.new(self).add(user)
        when 'leave_game'
          Games::Game::RemovePlayer.new(self).remove(user)
      end
    end

    def select_tile(options)
      tile = tiles.order(:position)[options.fetch(:position)]

      if tile.player.present?
        self.errors[:base] << 'Tile already taken'
        return false
      end

      if tiles.where(player_id: player.id).count >= INIT_TILE_COUNT
        self.errors[:base] << 'Reached initial tile maximum'
        return false
      end

      player = options.fetch(:player)
      tile.update_attributes(player: player)

      if tile.player != player
        self.errors[:base] << 'Tile already taken'
        return false
      end

      if tiles.where(player_id: player.id).count == INIT_TILE_COUNT
        player.update_attributes
      end

      true
    end

    private

    def number_of_players
      if players.length > max_player
        errors.add(:players, "count must be less than #{max_player}")
      end
    end

    class << self
      def build_for_user(user, max_player)
        player = Games::Player.new(
          status: Games::Player::PENDING,
          user: user
        )
        new(
          status: Games::Game::PENDING,
          creator: user,
          max_player: max_player,
          players: [ player ]
        )
      end
    end
  end
end
