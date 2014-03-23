module Demo
  class ApplicationController < ActionController::Base
    @skip_layout = @skip_auth = true
    include Shared::Controller::Layout

  end
end
