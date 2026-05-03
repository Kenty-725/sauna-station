class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include Devise::Controllers::Helpers

  protect_from_forgery with: :null_session

  PENDING_STAFF_CONFIRMATION_COOKIE = :pending_staff_confirmation

  private

  def set_pending_staff_confirmation_cookie(staff)
    cookies.signed[PENDING_STAFF_CONFIRMATION_COOKIE] = {
      value: {
        staff_id: staff.id
      },
      httponly: true,
      same_site: :lax,
      secure: Rails.env.production?,
      expires: 1.day.from_now
    }
  end

  def clear_pending_staff_confirmation_cookie
    cookies.delete(PENDING_STAFF_CONFIRMATION_COOKIE)
  end

  def pending_staff_confirmation
    payload = cookies.signed[PENDING_STAFF_CONFIRMATION_COOKIE]
    return nil unless payload.is_a?(Hash)

    Staff.find_by(id: payload['staff_id'] || payload[:staff_id], confirmed_at: nil)
  end

  def serialize_current_staff(staff)
    {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
      facility_id: staff.facility_id,
      needs_facility_setup: staff.admin? && staff.facility_id.blank?
    }
  end

  def preflight
    head :no_content
  end
end
