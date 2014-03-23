module User
  class HomeController < ApplicationController
    include Shared::Controller::Layout

    def index
      render text: "Hello: #{current_user.email}"
    end

    def wtf
      render text: 'you made it'
    end
  end
end