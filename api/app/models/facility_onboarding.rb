class FacilityOnboarding < ApplicationRecord
  belongs_to :staff
  belongs_to :facility, optional: true

  enum :current_step, {
    account: 0,      ##アカウント作成
    facility_info: 1,##施設基本情報登録
    complete: 2,     ##完了
  }

  def advance_to_next_step!
    step = next_step
    raise AlreadyOnboardedError if step.nil?

    update!(current_step: step)
    step
  end

  def ensure_at_least!(target_step)
    target_key = target_step.to_sym
    target_value = self.class.current_steps[target_key]
    raise ArgumentError, "unknown step: #{target_step}" unless target_value

    current_value = self.class.current_steps[current_step]
    return if target_value <= current_value

    update!(current_step: target_key)
  end

  class AlreadyOnboardedError < StandardError; end

  private

  def next_step
    steps = self.class.current_steps.keys
    current_index = steps.index(current_step)
    steps[current_index + 1]
  end
end
