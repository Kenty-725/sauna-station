class Staffs::SessionsController < Devise::SessionsController
  respond_to :json
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    status = signed_out ? :ok : :unauthorized

    render json: { message: 'signed_out' }, status: status
  end

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: 'signed_in',
      staff: serialize_current_staff(resource)
    }, status: :ok
  end
end
