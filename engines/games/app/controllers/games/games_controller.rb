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
      game = Game.build_for_user(
        current_user.becomes(Games::User),
        params[:max_player]
      )

      if game.save
        render json: { id: game.id }
      else
        raise "Unable to create game.. fail.."
      end
    end

    def update
      game = Game.find(params[:id])
      if game.add_player(current_user.becomes(Games::User))
        render json: { id: game.id, errors: [] }
      else
        render json: { id: game.id, errors: game.errors.full_messages }
      end
    end
  end
end
