module Games
  class ApplicationController < ActionController::Base
    layout 'shared/layouts/application'
    include Shared::Controller::TokenAuthentication
    before_filter :require_user_authentication!
  end
end
