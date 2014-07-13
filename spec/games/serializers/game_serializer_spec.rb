require "spec_helper"

describe Games::GameSerializer do
  let(:consumer) { Responsible::Consumer.new }
  let(:user) { Games::User.create!(name: 'Dave') }
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
        player_count: [1, 4],
        joinable: false,
        players: [
          { name: 'Dave', id: user.id, status: 'pending' }
        ]
      }
    )
  end

  it "is marked as joinable is user is not already a player" do
    other_user = Games::User.create!(name: 'Fred', email: 'fred@test.com')
    json = described_class.new(consumer, game, other_user).as_json

    expect(json[:joinable]).to be_true
  end
end