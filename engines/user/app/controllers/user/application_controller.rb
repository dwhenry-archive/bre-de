module User
  class ApplicationController < ActionController::Base

    include Shared::Controller::Layout

    before_filter :configure_permitted_parameters, if: :devise_controller?

    protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) << :name
    end
  end
end
