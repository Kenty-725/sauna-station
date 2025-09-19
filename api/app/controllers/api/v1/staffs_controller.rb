module Api
  module V1
    class StaffsController < ApplicationController
      def create
        staff = Staff.new(staff_params)
        # TODO: MVPでは問題ないが、スタッフ権限を持つスタッフを追加する際に調整する
        staff.role = :admin # 管理者固定
      
        if staff.save
          confirmation_url = "#{request.base_url}/api/v1/confirm?token=#{staff.confirmation_token}"
          Rails.logger.info "[CONFIRMATION] URL: #{confirmation_url}"
          render json: { message: "仮登録完了。ログに確認用URLを出力しました。" }, status: :created
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
