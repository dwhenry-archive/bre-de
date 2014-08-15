module Games
  class Game
    class RemovePlayer < SimpleDelegator
      def remove(player)
        if players.where(user_id: player.id).none?
          self.errors[:base] << 'User is not a player in this game'
          return false
        elsif players.count == 1
          self.delete
          return true
        else
          players.where(user_id: player.id).first.delete
          return true
        end
        self.errors[:base] << 'This was unexpected.. Please try that again..'
        false
      end
    end
  end
end
