require 'spec_helper'

describe Games::Game::AddPlayer do
  let(:user) { User::User.create!(email: 'test@test.com', name: 'test', password: '12345678', password_confirmation: '12345678').becomes(Games::User) }
  let(:game) { Games::Game.build_for_user(user, 4).tap { |g| g.save! } }
  let(:starter) { double(init: true) }
  subject { described_class.new(game) }

  before do
    allow(Games::Game::SetupBoard).to receive(:new).and_return(starter)
  end

  it 'allows another user to join a game' do
    user = User::User.create!(email: "other@test.com", name: "other", password: '12345678', password_confirmation: '12345678').becomes(Games::User)
    expect do
      subject.add(user)
    end.to_not raise_error
  end

  it 'does not allow the same players to join a game twice' do
    expect do
      subject.add(user)
    end.to raise_error
  end

  it 'does not allow more than the maximum number of players to join the game' do
    3.times do |i|
      user = User::User.create!(email: "#{i}@test.com", name: "t#{i}", password: '12345678', password_confirmation: '12345678').becomes(Games::User)
      subject.add(user)
    end
    expect do
      subject.add(user)
    end.to raise_error
  end

  it 'runs the "StartGame" functionality when all places are taken' do
    expect(starter).to receive(:init)
    3.times do |i|
      user = User::User.create!(email: "#{i}@test.com", name: "t#{i}", password: '12345678', password_confirmation: '12345678').becomes(Games::User)
      subject.add(user)
    end
  end
end
