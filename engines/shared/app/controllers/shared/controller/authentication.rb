module Shared
  module Controller
    module Authentication
      extend ::ActiveSupport::Concern

      included do
        # This is our new function that comes before Devise's one
        before_filter :authenticate_user_from_token!
        # This is Devise's authentication
        before_filter :authenticate_user!
      end

      protected

      def authenticate_user_from_token!
        user =
          if (user_email = params[:email].presence)
            User::User.find_by_email(user_email)
          elsif (user_name = params[:name].presence)
            User::User.find_by_name(user_name)
          end

        # Notice how we use Devise.secure_compare to compare the token
        # in the database with the token given in the params, mitigating
        # timing attacks.
        if user && Devise.secure_compare(user.authentication_token, params[:token])
          sign_in user, store: false
        end
      end
    end
  end
end
