class FacilityOnboarding < ApplicationRecord
  belongs_to :staff
  belongs_to :facility, optional: true

  enum :current_step, {
    account: 0,      ##アカウント作成
    email_verify: 1, ##メール確認
    facility_info: 2,##施設基本情報登録
    complete: 3,     ##完了
  }

  def advance_to_next_step!
    step = next_step
    raise AlreadyOnboardedError if step.nil?

    update!(current_step: step)
    step
  end

  class AlreadyOnboardedError < StandardError; end

  private

  def next_step
    steps = self.class.current_steps.keys
    current_index = steps.index(current_step)
    steps[current_index + 1]
  end
end
