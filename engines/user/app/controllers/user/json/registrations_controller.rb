module User
  class Json::RegistrationsController < Json::BaseController

    respond_to :json

    def create
      build_resource(sign_up_params)

      if resource.save
        render json: resource.as_json(
          auth_token: resource.authentication_token,
          email: resource.email
        ), status: 201
        return
      else
        warden.custom_failure!
        render json: resource.errors, status: 422
      end
    end
  end
end

