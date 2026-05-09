Rails.application.routes.draw do
  scope '/api/v1', defaults: { format: :json } do
    devise_for :staffs,
               controllers: {
                 sessions: 'staffs/sessions',
                 registrations: 'staffs/registrations',
                 confirmations: 'staffs/confirmations'
               },
               skip: [:passwords]

    devise_scope :staff do
      get 'staffs/confirmation/pending', to: 'staffs/confirmations#pending'
    end

    get 'staffs/me', to: 'staffs/me#show'
    resources :facilities, only: [:create]

    match '*path', to: 'application#preflight', via: :options
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end
end
