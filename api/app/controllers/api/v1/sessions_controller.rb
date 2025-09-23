module Api
  module V1
    class SessionsController < ApplicationController
      # POST /api/v1/login
      def create
        email = params[:email].to_s
        password = params[:password].to_s

        if email.blank? || password.blank?
          return render json: { error: 'メールアドレスとパスワードを入力してください' }, status: :unprocessable_entity
        end

        staff = Staff.find_by(email: email)
        unless staff&.authenticate(password)
          return render json: { error: 'メールアドレスまたはパスワードが正しくありません' }, status: :unauthorized
        end

        unless staff.email_verified_at.present?
          return render json: { error: 'メール確認が未完了です。確認メールをご確認ください。' }, status: :forbidden
        end

        session[:staff_id] = staff.id
        render json: {
          message: 'ログインしました',
          staff: { id: staff.id, name: staff.name, email: staff.email, role: staff.role }
        }, status: :ok
      end

      # DELETE /api/v1/logout
      def destroy
        reset_session
        render json: { message: 'ログアウトしました' }, status: :ok
      end
    end
  end
end

