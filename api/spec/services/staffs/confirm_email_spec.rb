require 'rails_helper'

RSpec.describe Staffs::ConfirmEmail do
  describe '.call' do
    it 'confirms email with valid token' do
      staff = create(:staff)
      staff.generate_confirmation_token
      staff.save!

      confirmed = described_class.call(staff.confirmation_token)
      expect(confirmed.id).to eq(staff.id)
      staff.reload
      expect(staff.email_verified_at).to be_present
      expect(staff.confirmation_token).to be_nil
    end

    it 'raises ArgumentError when token is blank' do
      expect { described_class.call('') }.to raise_error(ArgumentError)
    end

    it 'raises RecordNotFound when token is invalid' do
      expect { described_class.call('invalid') }.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'raises AlreadyConfirmedError when already verified' do
      staff = create(:staff, email_verified_at: Time.current)
      staff.generate_confirmation_token
      staff.save!

      expect {
        described_class.call(staff.confirmation_token)
      }.to raise_error(Staffs::ConfirmEmail::AlreadyConfirmedError)
    end
  end
end

