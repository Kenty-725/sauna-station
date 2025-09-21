module Api
  module V1
    class ConfirmationsController < ApplicationController
      # GET /api/v1/confirm?token=...
      def show
        token = params[:token].to_s
        return render json: { error: 'トークンが不正です' }, status: :unprocessable_entity if token.blank?

        staff = Staff.find_by(confirmation_token: token)
        return render json: { error: 'トークンが無効です' }, status: :not_found unless staff

        staff.confirm!
        render json: { message: 'メールアドレスを確認しました' }, status: :ok
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
    end
  end
end

