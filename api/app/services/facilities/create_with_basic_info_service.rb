module Facilities
  class CreateWithBasicInfoService
    Result = Struct.new(:facility, :success?, :errors, keyword_init: true)

    def initialize(staff:, params:)
      @staff = staff
      @facility_params = params
    end

    def call
      facility = nil

      ActiveRecord::Base.transaction do
        # 施設を登録する
        facility = Facility.create_account(facility_params)
        # 管理アカウントに施設を割り当てる
        staff.assign_facility(facility)
      end

      # 成功時の結果を返す
      Result.new(facility:, success?: true)
    rescue ActiveRecord::RecordInvalid => e
      facility = e.record if e.record.is_a?(Facility)
      facility&.errors&.add(:base, staff_assignment_error_message) if e.record.is_a?(Staff)

      # 失敗時の結果を返す
      Result.new(facility:, success?: false, errors: facility&.errors&.full_messages)
    end

    private

    attr_reader :staff, :facility_params

    def staff_assignment_error_message
      staff.errors.full_messages.presence&.join(", ") ||
        "スタッフへの施設割り当てに失敗しました。"
    end
  end
end
