module Shared
  module Controller
    module TokenAuthentication
      extend ::ActiveSupport::Concern

      included do
        # This is our new function that comes before Devise's one
        before_filter :authenticate_user_from_token!
      end

      protected

      def authenticate_user_from_token!
        user_email = params[:email].presence
        user       = user_email && User::User.find_by_email(user_email)

        # Notice how we use Devise.secure_compare to compare the token
        # in the database with the token given in the params, mitigating
        # timing attacks.
        if user && Devise.secure_compare(user.authentication_token, params[:token])
          sign_in user, store: false
        end
      end

      def require_user_authentication!
        current_user || render(json: { status: 'logout', error: ['invalid user token'] })
      end
    end
  end
end