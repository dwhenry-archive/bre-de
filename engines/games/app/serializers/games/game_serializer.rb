module Games
  class GameSerializer < Responsible::Base
    property :id, delegate: true
    property :status, delegate: true
    property :stats
    property :players
    property :joinable

    def initialize(c, g, user)
      @user = user
      super(c, g)
    end

    def stats
      "(#{game.players.count} of #{game.max_player})"
    end

    def players
      data.players.map do |player|
        {
          id: player.user.id,
          name: player.user.name,
          status: player.status
        }
      end
    end

    def joinable
      data.players.none? { |p| p.user == @user }
    end
  end
end