module Api
  module V1
    class SessionsController < ApplicationController
      # POST /api/v1/login
      def create
        email = params[:email].to_s
        password = params[:password].to_s

        staff = ::Auth::StaffLogin.call(email: email, password: password)
        session[:staff_id] = staff.id
        render json: {
          message: 'ログインしました',
          staff: { id: staff.id, name: staff.name, email: staff.email, role: staff.role }
        }, status: :ok
      rescue ArgumentError => e
        render json: { error: e.message }, status: :unprocessable_entity
      rescue Auth::StaffLogin::NotVerifiedError => e
        render json: { error: e.message }, status: :forbidden
      rescue StandardError => e
        render json: { error: e.message }, status: :unauthorized
      end

      # DELETE /api/v1/logout
      def destroy
        reset_session
        render json: { message: 'ログアウトしました' }, status: :ok
      end
    end
  end
end
