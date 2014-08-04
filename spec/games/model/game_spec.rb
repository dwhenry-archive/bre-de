require 'spec_helper'

describe Games::Game do
  context 'validations' do
    let(:user) { User::User.create!(email: 'test@test.com', name: 'test', password: '12345678', password_confirmation: '12345678').becomes(Games::User) }
    let(:game) { described_class.build_for_user(user, 4).tap { |g| g.save! } }

    it 'allows another user to join a game' do
      user = User::User.create!(email: "other@test.com", name: "other", password: '12345678', password_confirmation: '12345678').becomes(Games::User)
      expect do
        game.add_player(user)
      end.to_not raise_error
    end

    it 'does not allow the same players to join a game twice' do
      expect do
        game.add_player(user)
      end.to raise_error
    end

    it 'does not allow more than the maximum number of players to join the game' do
      3.times do |i|
        user = User::User.create!(email: "#{i}@test.com", name: "t#{i}", password: '12345678', password_confirmation: '12345678').becomes(Games::User)
        game.add_player(user)
      end
      expect do
        game.add_player(user)
      end.to raise_error
    end
  end

  context 'starting' do
    let(:user) { User::User.create!(email: 'test@test.com', name: 'test', password: '12345678', password_confirmation: '12345678').becomes(Games::User) }
    let(:game) { described_class.build_for_user(user, 2).tap { |g| g.save! } }

    before do
      user = User::User.create!(email: "1@test.com", name: "t1", password: '12345678', password_confirmation: '12345678').becomes(Games::User)
      game.add_player(user)
    end

    it 'set states game: running and players: pick_init_tiles' do
      expect(game.status).to eq(Games::Game::RUNNING)

      expect(game.players.map(&:status)).to eq([
        Games::Player::PICK_INIT_TILES,
        Games::Player::PICK_INIT_TILES,
      ])
    end

    it 'sets up the tiles' do
      game_tiles = game.tiles.map { |tile| {color: tile.color, value: tile.value} }
      expect(game_tiles).to match_array([
        {color: 'white', value: '0'},
        {color: 'white', value: '1'},
        {color: 'white', value: '2'},
        {color: 'white', value: '3'},
        {color: 'white', value: '4'},
        {color: 'white', value: '5'},
        {color: 'white', value: '6'},
        {color: 'white', value: '7'},
        {color: 'white', value: '8'},
        {color: 'white', value: '9'},
        {color: 'black', value: '0'},
        {color: 'black', value: '1'},
        {color: 'black', value: '2'},
        {color: 'black', value: '3'},
        {color: 'black', value: '4'},
        {color: 'black', value: '5'},
        {color: 'black', value: '6'},
        {color: 'black', value: '7'},
        {color: 'black', value: '8'},
        {color: 'black', value: '9'},
      ])
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
  end
end

