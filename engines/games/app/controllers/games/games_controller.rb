module Games
  class GamesController < Games::ApplicationController
    def index
      games = Game.filter(params[:filter], current_user).all.map do |game|
        {
          id: game.id,
          status: game.status,
          stats: " (#{game.players.count} of #{game.max_player})",
          players: game.players.map{ |p| p.user.name }.join(', ')
        }
      end
      render json: games
    end

    def create
      game = Game.new(
        status: Game::PENDING,
        creator: current_user.becomes(Games::User),
        max_player: params[:max_player],
        players: [
          Player.new(
            status: Player::PENDING,
            user: current_user.becomes(Games::User)
          )
        ]
      )

      if game.save
        render json: { id: game.id }
      else
        raise "Unable to create game.. fail.."
      end
    end
  end
end
