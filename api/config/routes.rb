Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :staffs, only: [:create]
      # Email confirmation
      get 'confirm', to: 'confirmations#show'
      post 'confirm/resend', to: 'confirmations#resend'
      get 'confirm/status', to: 'confirmations#status'

      # Auth
      # Legacy endpoints
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
      # Staff-specific endpoints
      post 'staff/login', to: 'sessions#create'
      delete 'staff/logout', to: 'sessions#destroy'

      resources :facilities, only: [:create]
    end
  end
  
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
