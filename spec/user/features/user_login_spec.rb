require "spec_helper"

describe "User Login" do

  describe "using JSON API endpoints" do
    include User::Engine.routes.url_helpers

    let!(:user) {
      Devise.stub(friendly_token: 'friendly_token')
      User::User.create!(
        email: "test@test.com",
        password: "tester12",
        password_confirmation: "tester12",
        name: "bob"
      )
    }

    it "allows user to login" do
      visit login_path(email: "test@test.com", password: "tester12")
      response = JSON.parse(page.body)
      expect(response).to eq(
        "success"     => true,
        "auth_token"  => "friendly_token",
        "name"        => "bob",
        "email"       => "test@test.com"
      )
    end
  end
end