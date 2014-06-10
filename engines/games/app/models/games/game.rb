module Games
  class Game < ActiveRecord::Base
    self.table_name = 'games'
    belongs_to :creator, class_name: Games::User
    has_many :players, class_name: Games::Player

    STATES = [
      PENDING = 'pending'
    ]

    class << self
      def filter(filter_type, user)
        case filter_type
          when 'for'
            includes(:players)
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
