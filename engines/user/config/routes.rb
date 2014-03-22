User::Engine.routes.draw do

  devise_for :users, class_name: "User::User", module: :devise, path: 'accounts'

  resources :help
  root to: "home#index"
end
