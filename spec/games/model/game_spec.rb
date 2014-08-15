require 'spec_helper'

describe Games::Game do


  context 'starting' do
    let(:user) { User::User.create!(email: 'test@test.com', name: 'test', password: '12345678', password_confirmation: '12345678').becomes(Games::User) }
    let(:game) { described_class.build_for_user(user, 2).tap { |g| g.save! } }

    before do
      user = User::User.create!(email: "1@test.com", name: "t1", password: '12345678', password_confirmation: '12345678').becomes(Games::User)
      game.add_player(user)
    end

    it 'allows players to select tiles in any order' do
      p1, p2 = *game.players

      game.select_tile(player: p1, position: 12)
      game.select_tile(player: p1, position: 11)
      game.select_tile(player: p1, position: 10)
      game.select_tile(player: p2, position: 9)
      game.select_tile(player: p2, position: 8)

      expect(p1.tiles.count).to eq(3)
      expect(p2.tiles.count).to eq(2)
    end

    it 'raises a tile already taken error tile has been taken' do
      p1, p2 = *game.players

      game.select_tile(player: p1, position: 12)
      game.select_tile(player: p1, position: 12)

      expect(game.errors.full_messages).to eq(['Tile already taken'])
    end

    it 'sets player status to picked init tiles one selected require number of initial tiles' do
      p1, p2 = *game.players

      game.select_tile(player: p1, position: 12)
      game.select_tile(player: p1, position: 11)
      game.select_tile(player: p1, position: 10)
      game.select_tile(player: p1, position: 9)

      p1.reload

      expect(p1.status).to eq(Games::Player::PICKED_INIT_TILES)
    end
  end
end

