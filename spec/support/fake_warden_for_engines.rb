
module FakeWardenForEngines
  def self.included(example_group)
    example_group.class_eval do
      before do
        @warden ||= begin
          manager = Warden::Manager.new(nil) do |config|
            config.merge! Devise.warden_config
          end
          @request.env['warden'] = Warden::Proxy.new(@request.env, manager)
        end
      end
    end
  end

  def json_response
    JSON.parse(response.body)
  end
end

RSpec.configure do |config|
  config.include FakeWardenForEngines, type: :controller
end
