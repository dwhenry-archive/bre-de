module Shared
  module Controller
    module Layout
      extend ::ActiveSupport::Concern

      included do
        layout 'shared/layouts/application' unless @skip_layout
        include Shared::Controller::Authentication unless @skip_auth
        include Shared::Controller::Manifests
      end
    end
  end
end
