class Staffs::MeController < ApplicationController
  before_action :authenticate_staff!

  def show
    render json: { staff: serialize_current_staff(current_staff) }, status: :ok
  end
end
