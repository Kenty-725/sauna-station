module Api
  module V1
    class ConfirmationsController < ApplicationController
      # GET /api/v1/confirm?token=...
      def show
        token = params[:token].to_s
        return render json: { error: 'トークンが不正です' }, status: :unprocessable_entity if token.blank?

        staff = Staff.find_by(confirmation_token: token)
        unless staff
          if request.format.html? || html_like?
            @message = 'リンクが無効、または既に使用されています。'
            @login_url = login_base_url
            return render inline: success_or_error_html(@message, @login_url), content_type: 'text/html', status: :unprocessable_entity
          end
          return render json: { error: 'トークンが無効です' }, status: :not_found
        end

        staff.confirm!
        if request.format.html? || html_like?
          @message = 'メール確認が完了しました。ログインして設定を続けてください。'
          @login_url = login_base_url
          return render inline: success_or_error_html(@message, @login_url), content_type: 'text/html', status: :ok
        end
        render json: { message: 'メール確認が完了しました' }, status: :ok
      end

      # POST /api/v1/confirm/resend
      def resend
        email = params[:email].to_s
        return render json: { error: 'メールアドレスを入力してください' }, status: :unprocessable_entity if email.blank?

        staff = Staff.find_by(email: email)
        return render json: { error: '対象のユーザーが見つかりません' }, status: :not_found unless staff

        if staff.email_verified_at.present?
          return render json: { error: 'すでに確認済みのメールアドレスです' }, status: :unprocessable_entity
        end

        staff.generate_confirmation_token
        staff.save!
        AdminMailer.confirmation_email(staff).deliver_now
        render json: { message: '確認メールを再送しました' }, status: :ok
      end

      # GET /api/v1/confirm/status?email=...
      # 確認済みかどうかの簡易チェック用
      def status
        email = params[:email].to_s
        return render json: { error: 'メールアドレスを入力してください' }, status: :unprocessable_entity if email.blank?

        staff = Staff.find_by(email: email)
        return render json: { error: '対象のユーザーが見つかりません' }, status: :not_found unless staff

        render json: { verified: staff.email_verified_at.present? }, status: :ok
      end

      private

      def html_like?
        accept = request.headers['Accept'].to_s
        accept.include?('text/html') || accept.include?('*/*')
      end

      def login_url_with_params(confirmed:, reason: nil)
        base = Rails.configuration.x.frontend_base_url
        q = ["confirmed=#{confirmed}"]
        q << "reason=#{reason}" if reason
        "#{base}/login?#{q.join('&')}"
      end

      def login_base_url
        Rails.configuration.x.frontend_base_url + "/login"
      end

      def success_or_error_html(message, login_url)
        <<~HTML
        <!doctype html>
        <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Sauna Station メール確認</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background:#f9fafb; color:#111827; }
            .card { max-width:640px; margin:10vh auto; background:#fff; padding:28px; border-radius:12px; box-shadow:0 4px 24px rgba(0,0,0,.08); }
            h1 { font-size:20px; margin:0 0 12px; }
            p { margin:0 0 16px; line-height:1.7; }
            a.button { display:inline-block; background:#2563eb; color:#fff; padding:10px 16px; border-radius:8px; text-decoration:none; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Sauna Station</h1>
            <p>#{ERB::Util.html_escape(message)}</p>
            <p><a class="button" href="#{ERB::Util.html_escape(login_url)}">ログインへ</a></p>
          </div>
        </body>
        </html>
        HTML
      end
    end
  end
end
