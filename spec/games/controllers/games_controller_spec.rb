require 'spec_helper'

describe Games::GamesController, type: :controller do
  let!(:user) { Games::User.create!(authentication_token: 'login_token', email: 'test@test.com', name: 'Dave') }

  describe '#index' do
    context "when filter is 'for'" do
      let!(:game) do
        Games::Game.create!(status: "pending", max_player: 4, players: [Games::Player.new(user: user)])
      end

      it 'returns json object for current user' do
        get :index, filter: 'for', token: 'login_token', email: 'test@test.com', use_route: :games

        json = JSON.parse(response.body)['games']

        # one game
        expect(json.count).to eq 1
        # with a single player
        expect(json.first['players'].count).to eq 1
      end
    end
  end

  describe '#create' do
    it 'creates a game with max_player and current_user as the first player' do
      expect{
        post :create, max_player: 4, token: 'login_token', email: 'test@test.com', use_route: :games
      }.to change {
        Games::Game.count
      }.by(1)

      game = Games::Game.last

      expect(game.max_player).to eq(4)
      expect(game.players.pluck(:user_id)).to eq([user.id])
    end
  end
end