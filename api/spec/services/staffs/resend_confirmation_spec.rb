require 'rails_helper'

RSpec.describe Staffs::ResendConfirmation do
  describe '.call' do
    it 'regenerates token and sends mail' do
      ActionMailer::Base.deliveries.clear
      staff = create(:staff)
      staff.update!(confirmation_token: nil, email_verified_at: nil)

      returned = described_class.call(staff.email)
      staff.reload
      expect(returned.id).to eq(staff.id)
      expect(staff.confirmation_token).to be_present
      expect(ActionMailer::Base.deliveries.size).to eq(1)
    end

    it 'raises ArgumentError when email is blank' do
      expect { described_class.call('') }.to raise_error(ArgumentError)
    end

    it 'raises RecordNotFound when email not found' do
      expect { described_class.call('none@example.com') }.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'raises AlreadyConfirmedError when already verified' do
      staff = create(:staff, email_verified_at: Time.current)
      expect { described_class.call(staff.email) }.to raise_error(Staffs::ResendConfirmation::AlreadyConfirmedError)
    end
  end
end

