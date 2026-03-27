class Staffs::ConfirmationsController < Devise::ConfirmationsController
  respond_to :json
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  # GET /staffs/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])

    if resource.errors.empty?
      clear_pending_staff_confirmation_cookie
      render json: { message: 'confirmed' }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /staffs/confirmation/pending
  def pending
    resource = pending_staff_confirmation

    if resource
      render json: { email: resource.email }, status: :ok
    else
      render json: { errors: ['確認待ちのアカウントが見つかりません'] }, status: :unprocessable_entity
    end
  end

  # POST /staffs/confirmation
  def create
    resource = pending_staff_confirmation
    return render json: { errors: ['確認メールを再送できませんでした'] }, status: :unprocessable_entity unless resource

    resource.send_confirmation_instructions
    resource.reload
    set_pending_staff_confirmation_cookie(resource)

    render json: {
      message: 'confirmation_email_resent',
      email: resource.email
    }, status: :ok
  end
end
