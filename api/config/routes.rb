Rails.application.routes.draw do
  scope '/api/v1', defaults: { format: :json } do
    devise_for :staffs,
               controllers: {
                 registrations: 'staffs/registrations',
                 confirmations: 'staffs/confirmations'
               },
               skip: [:sessions, :passwords]

    devise_scope :staff do
      get 'staffs/confirmation/pending', to: 'staffs/confirmations#pending'
    end

    match '*path', to: 'application#preflight', via: :options
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end
end
