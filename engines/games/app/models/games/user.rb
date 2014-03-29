module Games
  class User < ActiveRecord::base
    self.table_name = 'users'
  end
end