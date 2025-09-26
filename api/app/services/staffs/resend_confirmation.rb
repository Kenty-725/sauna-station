module Staffs
  class ResendConfirmation
    AlreadyConfirmedError = Class.new(StandardError)

    # Returns the Staff, or raises:
    # - ArgumentError (blank email)
    # - ActiveRecord::RecordNotFound (email not found)
    # - AlreadyConfirmedError (already verified)
    def self.call(email)
      raise ArgumentError, 'メールアドレスを入力してください' if email.blank?

      staff = Staff.find_by!(email: email)
      raise AlreadyConfirmedError, 'すでに確認済みのメールアドレスです' if staff.email_verified_at.present?

      staff.generate_confirmation_token
      staff.save!
      AdminMailer.confirmation_email(staff).deliver_now

      staff
    end
  end
end
