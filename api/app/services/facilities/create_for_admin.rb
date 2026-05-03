module Facilities
  class CreateForAdmin
    class NotAllowedError < StandardError; end
    class AlreadyLinkedError < StandardError; end

    def self.call(staff:, facility_params:)
      new(staff:, facility_params:).call
    end

    def initialize(staff:, facility_params:)
      @staff = staff
      @facility_params = facility_params
    end

    def call
      raise NotAllowedError unless staff.admin?

      Staff.transaction do
        staff.lock!
        raise AlreadyLinkedError if staff.facility_id.present?

        facility = Facility.create!(facility_params)
        staff.update!(facility:)
        facility
      end
    end

    private

    attr_reader :staff, :facility_params
  end
end
