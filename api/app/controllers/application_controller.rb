class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from StandardError, with: :render_internal_error

  I18n.default_locale = :ja

  private

  def render_validation_errors(record)
    errors = record.errors.map do |error|
      detail = record.errors.details[error.attribute]&.first
      {
        field: error.attribute,
        code: detail ? detail[:error] : "invalid",
        message: error.message
      }
    end
  
    render json: { errors: errors }, status: :unprocessable_entity
  end
  

  def render_unprocessable(exception)
    render_validation_errors(exception.record)
  end

  def render_not_found(exception)
    Rails.logger.error("[NOT FOUND] #{exception.message}\n#{exception.backtrace.join("\n")}")
    render json: { error: "リソースが見つかりません" }, status: :not_found
  end

  def render_internal_error(exception)
    Rails.logger.error("[INTERNAL ERROR] #{exception.message}\n#{exception.backtrace.join("\n")}")
    render json: { error: "予期せぬエラーが発生しました" }, status: :internal_server_error
  end
end
