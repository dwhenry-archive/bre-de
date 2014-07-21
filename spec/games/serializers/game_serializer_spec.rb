require "spec_helper"

describe Games::GameSerializer do
  let(:consumer) { Responsible::Consumer.new }
  let(:user) do
    User::User.create!(
      name: 'Dave',
      email: 'test@test.com',
      password: 'testers1',
      password_confirmation: 'testers1',
    ).becomes(Games::User)
  end
  let(:game) do
    Games::Game.create!(
      status: "pending",
      max_player: 4,
      players: [Games::Player.new(user: user, status: 'pending')]
    )
  end

  it "returns a json representation of the object" do
    json = described_class.new(consumer, game, user).as_json

    expect(json).to eq(
      {
        id: game.id,
        status: 'pending',
        stats: "(1 of 4)",
        joinable: false,
        players: [
          { name: 'dave', id: user.id, status: 'pending' }
        ]
      }
    )
  end

  it "is marked as joinable is user is not already a player" do
    other_user = User::User.create!(
      name: 'Fred',
      email: 'fred@test.com',
      password: 'testers1',
      password_confirmation: 'testers1',
    ).becomes(Games::User)

    json = described_class.new(consumer, game, other_user).as_json

    expect(json[:joinable]).to be_true
  end
end