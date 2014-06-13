module User
  class Json::RegistrationsController < Devise::RegistrationsController

    respond_to :json

    def create
      build_resource(sign_up_params)

      if resource.save
        render json: resource.as_json.merge(
          auth_token: resource.authentication_token
        ), status: 201
        return
      else
        warden.custom_failure!
        render json: resource.errors, status: 422
      end
    end
  end
end

