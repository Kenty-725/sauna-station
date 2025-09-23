module Api
  module V1
    class ConfirmationsController < ApplicationController
      # GET /api/v1/confirm?token=...
      def show
        token = params[:token].to_s
        return render json: { error: 'トークンが不正です' }, status: :unprocessable_entity if token.blank?

        staff = Staff.find_by(confirmation_token: token)
        unless staff
          return redirect_to(login_url_with_params(confirmed: 0, reason: 'invalid_token')) if request.format.html? || html_like?
          return render json: { error: 'トークンが無効です' }, status: :not_found
        end

        staff.confirm!
        return redirect_to(login_url_with_params(confirmed: 1)) if request.format.html? || html_like?
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
        "#{base}/staff/login?#{q.join('&')}"
      end

      def login_base_url
        Rails.configuration.x.frontend_base_url + "/login"
      end
    end
  end
end
