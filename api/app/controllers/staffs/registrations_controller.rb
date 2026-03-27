class Staffs::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  before_action :configure_sign_up_params, only: [:create]

  # POST /staffs
  def create
    build_resource(sign_up_params)
    resource.role ||= :admin

    if resource.save
      set_pending_staff_confirmation_cookie(resource)
      yield resource if block_given?
      render json: {
        message: 'confirmation_email_sent',
        email: resource.email
      }, status: :created
    else
      clean_up_passwords resource
      set_minimum_password_length
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name facility_id])
  end
end
