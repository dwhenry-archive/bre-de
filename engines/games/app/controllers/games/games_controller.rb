module Games
  class GamesController < Games::ApplicationController
    after_action :send_notification, only: [:create, :update]

    def index
      render json: GamesSerializer.new(
        Responsible::Consumer.new,
        Game.all,
        current_user
      )
    end

    def create
      @game = Game.build_for_user(
        current_user.becomes(Games::User),
        params[:max_player]
      )

      if @game.save
        render json: { status: 'success', game_id: @game.id }
      else
        render json: { status: 'error', errors: @game.errors.full_messages }, status: 400
      end
    end

    def update
      @game = Game.find(params[:id])
      if @game.execute_command(params[:command], current_user.becomes(Games::User))
        render json: { status: 'success', game_id: @game.id }
      else
        render json: { status: 'error', errors: @game.errors.full_messages }
      end
    end

    private

    def send_notification
      Pusher.trigger(
        'CodeBreaker',
        'gameUpdate',
        {
          id: @game.id,
          newGame: @game.new_record?
        }
      )
    end
  end
end
