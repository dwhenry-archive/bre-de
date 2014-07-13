module Games
  class GamesSerializer < Responsible::Base
    property :games
    property :status

    def initialize(c, g, user)
      @user = user,
      super(c, g)
    end

    def games
      data.map do |game|
        GameSerializer.new(consumer, game, @user)
      end
    end

    def status
      'success'
    end
  end
end