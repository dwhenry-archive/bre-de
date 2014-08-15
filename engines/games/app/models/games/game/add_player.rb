module Games
  class Game
    class AddPlayer < SimpleDelegator
      def add(player)
        status = false
        ActiveRecord::Base.transaction do
          players.create!(
            status: Games::Player::PENDING,
            user: player
          )
          players.reload
          # This is a fail safe against two people attempt to join a gaim simultaneously
          raise ActiveRecord::Rollback if players.count > max_player
          status = true
        end
        return false unless status

        Games::Game::SetupBoard.new(__getobj__).init if players.count == max_player
        true
      end
    end
  end
end
