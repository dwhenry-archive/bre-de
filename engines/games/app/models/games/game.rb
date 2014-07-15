module Games
  class Game < ActiveRecord::Base
    self.table_name = 'games'
    belongs_to :creator, class_name: Games::User
    has_many :players, class_name: Games::Player

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
      if players.where(user_id: user.id).any?
        self.errors[:base] << 'User is already a player in this game'
        return false
      elsif players.count >= max_player
        self.errors[:base] << 'Game already has required number of player'
        return false
      else
        self.class.transaction do
          players.create(
            status: Player::PENDING,
            user: user
          )
          # This is a fail safe against two people attempt to join a gaim simultaneously
          raise ActiveRecord::Rollback if players.count > max_player
          return true
        end
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

    class << self
      def build_for_user(user, max_player)
        new(
          status: Game::PENDING,
          creator: user,
          max_player: max_player,
          players: [
            Player.new(
              status: Player::PENDING,
              user: user
            )
          ]
        )
      end

      def filter(filter_type, user)
        case filter_type
          when 'for'
            joins(:players)
            .where(players: {user_id: user.id})
          when 'waiting'
            joins(:players)
            .where(["players.user_id != ?", user.id])
            .where(status: 'pending')
        end
      end
    end
  end
end
