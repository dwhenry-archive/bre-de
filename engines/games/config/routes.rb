Games::Engine.routes.draw do
  resources :games, only: [:index, :create]
end
