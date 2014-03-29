module Games
  class Game < ActiveRecord::Base
    self.table_name = 'games'
    belongs_to :creator, class_name: Games::User
  end
end
