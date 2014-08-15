require 'spec_helper'

describe Games::Game::SetupBoard do
  let(:user) { User::User.create!(email: 'test@test.com', name: 'test', password: '12345678', password_confirmation: '12345678').becomes(Games::User) }
  let(:game) { Games::Game.build_for_user(user, 2).tap { |g| g.save! } }
  subject { described_class.new(game) }

  before { subject.init }

  it 'set game state: initialize' do
    expect(game.status).to eq(Games::Game::INITIALIZE)
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
end
