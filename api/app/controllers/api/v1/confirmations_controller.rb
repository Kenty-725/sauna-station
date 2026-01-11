module Api
  module V1
    class ConfirmationsController < ApplicationController
      # GET /api/v1/confirm?token=...
      def show
        ::Staffs::ConfirmEmail.call(params[:token].to_s)
        return redirect_to(login_url_with_params(confirmed: 1)) if request.format.html? || html_like?
        render json: { message: 'メール確認が完了しました' }, status: :ok
      rescue ArgumentError
        return redirect_to(login_url_with_params(confirmed: 0, reason: 'invalid_token')) if request.format.html? || html_like?
        render json: { error: 'トークンが不正です' }, status: :unprocessable_entity
      rescue ActiveRecord::RecordNotFound
        return redirect_to(login_url_with_params(confirmed: 0, reason: 'invalid_token')) if request.format.html? || html_like?
        render json: { error: 'トークンが無効です' }, status: :not_found
      rescue Staffs::ConfirmEmail::AlreadyConfirmedError
        return redirect_to(login_url_with_params(confirmed: 1, reason: 'already_confirmed')) if request.format.html? || html_like?
        render json: { message: 'すでに確認済みです' }, status: :ok
      end

      # POST /api/v1/confirm/resend
      def resend
        ::Staffs::ResendConfirmation.call(params[:email].to_s)
        render json: { message: '確認メールを再送しました' }, status: :ok
      rescue ArgumentError => e
        render json: { error: e.message }, status: :unprocessable_entity
      rescue ActiveRecord::RecordNotFound
        render json: { error: '対象のユーザーが見つかりません' }, status: :not_found
      rescue Staffs::ResendConfirmation::AlreadyConfirmedError => e
        render json: { error: e.message }, status: :unprocessable_entity
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
