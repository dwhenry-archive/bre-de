module Games
  class User < ActiveRecord::Base
    include Shared::Model::ReadOnly

    self.table_name = 'users'

  end
end
