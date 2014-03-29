module Games
  class GameSerializer < Responsible::Base
    property :max_players, delegate: true
    property :players

  end
end