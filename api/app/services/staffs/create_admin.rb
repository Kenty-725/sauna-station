module Staffs
  class CreateAdmin
    # Create an admin Staff and return the instance (persisted or not)
    def self.call(params)
      staff = Staff.new(params)
      staff.role = :admin
      staff.generate_confirmation_token

      if staff.save
        AdminMailer.confirmation_email(staff).deliver_now
      end

      staff
    end
  end
end
