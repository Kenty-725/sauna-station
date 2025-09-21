Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :staffs, only: [:create]
      # Email confirmation
      get 'confirm', to: 'confirmations#show'
      post 'confirm/resend', to: 'confirmations#resend'
    end
  end
  
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
