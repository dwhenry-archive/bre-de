module Shared
  module Controller
    module Authentication
      extend ::ActiveSupport::Concern

      included do
        include TokenAuthentication

        # This is Devise's authentication
        before_filter :authenticate_user!
      end
    end
  end
end
