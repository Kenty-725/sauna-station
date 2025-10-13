class Api::V1::FacilitiesController < ApplicationController
  before_action :authenticate_staff!

  # 基本処理はサービス層に委ねてあくまでコントローラーはAPIの呼び出しのみ
  def create
    result = Facilities::CreateService.new(staff: current_staff, params: facility_params).call

    if result.success?
      render json: { facility: result.facility }, status: :created
    else
      render_validation_errors(result.facility)
    end
  end  

  def facility_params
    params.require(:facility).permit(
      :name,
      :phone,
      :address_prefecture,
      :address_line,
      :postal_code,
      :description,
      :access_info,
      :base_capacity,
      :base_price,
      :status
    )
  end
end
