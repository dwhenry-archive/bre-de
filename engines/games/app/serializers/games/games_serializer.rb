module Games
  class GamesSerializer < Responsible::Base
    property :games

    def games
      data.each do |game|
        GameSerializer.new(consumer, game)
      end
    end
  end
end