module Games
  class Game < ActiveRecord::Base
    self.table_name = 'games'
    belongs_to :creator, class_name: Games::User
    has_many :players, class_name: Games::Player, inverse_of: :game

    validate :number_of_players

    STATES = [
      PENDING = 'pending'
    ]

    def execute_command(command, user)
      case command
        when 'add_player'
          add_player(user)
        when 'leave_game'
          remove_player(user)
      end
    end

    def add_player(user)
      self.class.transaction do
        players.create!(
          status: Games::Player::PENDING,
          user: user
        )
        players.reload
        # This is a fail safe against two people attempt to join a gaim simultaneously
        raise ActiveRecord::Rollback if players.count > max_player
        return true
      end
      self.errors[:base] << 'This was unexpected.. Please try that again..'
      false
    end

    def remove_player(user)
      if players.where(user_id: user.id).none?
        self.errors[:base] << 'User is not a player in this game'
        return false
      elsif players.count == 1
        self.delete
        return true
      else
        players.where(user_id: user.id).first.delete
        return true
      end
      self.errors[:base] << 'This was unexpected.. Please try that again..'
      false
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
