require 'spec_helper'

describe Games::GamesController, "Creating a new game", type: :controller do
  routes { Games::Engine.routes }

  let!(:user) do
    User::User.create!(
      email: "test@test.com",
      password: "tester12",
      password_confirmation: "tester12",
      name: "bob"
    ).becomes(Games::User)
  end

  let!(:creator) do
    User::User.create!(
      email: "creator@test.com",
      password: "tester12",
      password_confirmation: "tester12",
      name: "creator"
    ).becomes(Games::User)
  end

  let!(:game) do
    game = Games::Game.build_for_user(creator, 4)
    game.save!
    game
  end

  it "allow user to be added as a player to a pending game via the api" do
    expect {
      put :update, id: game.id, command: 'add_player', email: user.email, token: user.authentication_token
    }.to change {
      game.players.count
    }.by(1)
  end

  it "does not add a user that is already a player of the game" do
    expect {
      put :update, id: game.id, email: creator.email, token: creator.authentication_token
    }.to_not change {
      game.players.count
    }
  end
end
