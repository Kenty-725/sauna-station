module Api
  module V1
    class StaffsController < ApplicationController
      def create
        # TODO: MVPでは問題ないが、スタッフ権限を持つスタッフを追加する際に調整する
        staff = Staff.create_admin_staff(staff_params)
        
        if staff.persisted?
          confirmation_url = staff.generate_confirmation_url(request.base_url)
          # TODO: メール送信の実装が必要でありその時に調整する
          Rails.logger.info "[CONFIRMATION] URL: #{confirmation_url}"
          render json: { message: "施設管理者アカウント仮登録完了。ログに確認用URLを出力しました。" }, status: :created
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
