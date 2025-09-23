Rails.application.config.session_store :cookie_store,
  key: '_sauna_app_session',
  # In development, Lax avoids Chrome's SameSite=None+Secure requirement
  same_site: Rails.env.production? ? :none : :lax,
  secure: Rails.env.production?
