class AdminMailer < ApplicationMailer
  default from: 'noreply@sauna-station.com'

  def welcome_email(staff)
    @staff = staff
    @app_name = 'Sauna Station'
    @login_url = 'http://localhost:5173/login'
    
    mail(
      to: @staff.email,
      subject: '【Sauna Station】管理者アカウントが作成されました'
    )
  end

  def confirmation_email(staff)
    @staff = staff
    @app_name = 'Sauna Station'
    @confirmation_url = confirmation_url_for(@staff)

    mail(
      to: @staff.email,
      subject: '【Sauna Station】メールアドレス確認のお願い'
    )
  end

  private

  def confirmation_url_for(staff)
    host = Rails.application.config.action_mailer.default_url_options[:host]
    port = Rails.application.config.action_mailer.default_url_options[:port]
    base = if port.present?
             "http://#{host}:#{port}"
           else
             "http://#{host}"
           end
    staff.generate_confirmation_url(base)
  end
end
