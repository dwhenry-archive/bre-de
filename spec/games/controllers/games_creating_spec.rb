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

  it "allow game creation via the api" do
    expect {
      post :create, email: user.email, token: user.authentication_token, max_player: 4
    }.to change {
      Games::Game.count
    }.by(1)
  end

  it 'creates a game for the current user with the specified number of max_players' do
    expect do
      post :create, email: user.email, token: user.authentication_token, max_player: 5
    end.to change { Games::Game.count }.by(1)

    game = Games::Game.first

    expect(game.creator).to eq(user)
    expect(game.max_player).to eq(5)
  end

  it 'add the current user as the only player on the game' do
    post :create, email: user.email, token: user.authentication_token, max_player: 5
    players = Games::Game.first.players

    expect(players.size).to eq(1)
    player = players.first

    expect(player.user).to eq(user)
  end
end
