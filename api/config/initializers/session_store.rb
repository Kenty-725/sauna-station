Rails.application.config.session_store :cookie_store,
  key: '_sauna_app_session',
  same_site: :none,
  secure: Rails.env.production?
