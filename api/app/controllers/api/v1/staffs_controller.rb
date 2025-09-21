module Api
  module V1
    class StaffsController < ApplicationController
      def create
        # TODO: MVPでは問題ないが、スタッフ権限を持つスタッフを追加する際に調整する
        staff = Staff.create_admin_staff(staff_params)
        
        if staff.persisted?
          confirmation_url = staff.generate_confirmation_url(request.base_url)
          Rails.logger.info "[CONFIRMATION] URL: #{confirmation_url}"
          render json: { 
            message: "施設管理者アカウントの仮登録が完了しました。登録されたメールアドレスに確認メールを送信しました。",
            email: staff.email 
          }, status: :created
        else
          render_validation_errors(staff)
        end
      end

      private

      def staff_params
        params.require(:staff).permit(:name, :email, :password, :password_confirmation)
      end
    end
  end
end
