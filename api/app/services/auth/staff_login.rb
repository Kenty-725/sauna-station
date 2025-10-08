module Auth
  class StaffLogin
    NotVerifiedError = Class.new(StandardError)

    # Returns Staff, or raises:
    # - ArgumentError (blank params)
    # - StandardError (invalid credentials)
    # - NotVerifiedError (email not verified)
    def self.call(email:, password:)
      raise ArgumentError, 'メールアドレスとパスワードを入力してください' if email.blank? || password.blank?

      staff = Staff.find_by(email: email)
      raise StandardError, 'メールアドレスまたはパスワードが正しくありません' unless staff&.authenticate(password)

      raise NotVerifiedError, 'メール確認が未完了です。確認メールをご確認ください。' unless staff.email_verified_at.present?

      staff
    end
  end
end
