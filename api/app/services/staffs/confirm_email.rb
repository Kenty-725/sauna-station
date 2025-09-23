module Staffs
  class ConfirmEmail
    AlreadyConfirmedError = Class.new(StandardError)

    # Returns the confirmed Staff, or raises:
    # - ArgumentError (blank token)
    # - ActiveRecord::RecordNotFound (invalid token)
    # - AlreadyConfirmedError (already verified)
    def self.call(token)
      raise ArgumentError, 'トークンが不正です' if token.blank?

      staff = Staff.find_by!(confirmation_token: token)
      raise AlreadyConfirmedError, 'すでに確認済みのメールアドレスです' if staff.email_verified_at.present?

      staff.confirm!
      staff
    end
  end
end
