User::Engine.routes.draw do

  get 'login' => "json/sessions#create"
  get 'logout' => "json/sessions#destroy"
  devise_scope :user do
    post 'signup' => "json/registrations#create"
  end

  devise_for :users,
    class_name: "User::User",
    module: :devise,
    path: 'accounts',
    token_authentication_key: 'authentication_key'

  get '/home/wtf' => "home#wtf"
  root to: "home#index"
end
