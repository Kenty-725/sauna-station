class FacilitiesController < ApplicationController
  before_action :authenticate_staff!
  skip_before_action :verify_authenticity_token

  def create
    facility = Facilities::CreateForAdmin.call(
      staff: current_staff,
      facility_params: facility_params.to_h.symbolize_keys
    )

    render json: { facility_id: facility.id, staff: serialize_current_staff(current_staff.reload) }, status: :created
  rescue Facilities::CreateForAdmin::NotAllowedError
    render json: { errors: ['施設を作成できるのは管理者のみです'] }, status: :forbidden
  rescue Facilities::CreateForAdmin::AlreadyLinkedError
    render json: { errors: ['施設はすでに設定されています'] }, status: :unprocessable_entity
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  private

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
