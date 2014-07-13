module Games
  class ApplicationController < ActionController::Base
    layout 'shared/layouts/application'
    include Shared::Controller::TokenAuthentication
  end
end
