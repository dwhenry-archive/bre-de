module Games
  class GamesController < Games::ApplicationController
    def index
      render json: Game.filter(params[:filter]).all
    end
  end
end