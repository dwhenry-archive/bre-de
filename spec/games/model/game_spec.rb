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
end

