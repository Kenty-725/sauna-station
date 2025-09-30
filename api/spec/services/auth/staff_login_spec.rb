require 'rails_helper'

RSpec.describe Auth::StaffLogin do
  describe '.call' do
    it 'returns staff when credentials are valid and verified' do
      staff = create(:staff, email: 'ok@example.com', password: 'pass1234', password_confirmation: 'pass1234', email_verified_at: Time.current)

      result = described_class.call(email: 'ok@example.com', password: 'pass1234')
      expect(result.id).to eq(staff.id)
    end

    it 'raises ArgumentError when params are blank' do
      expect { described_class.call(email: '', password: '') }.to raise_error(ArgumentError)
    end

    it 'raises StandardError when credentials are invalid' do
      create(:staff, email: 'ng@example.com', password: 'pass1234', password_confirmation: 'pass1234', email_verified_at: Time.current)
      expect { described_class.call(email: 'ng@example.com', password: 'wrong') }.to raise_error(StandardError)
    end

    it 'raises NotVerifiedError when not verified' do
      staff = create(:staff, email: 'unv@example.com', password: 'pass1234', password_confirmation: 'pass1234', email_verified_at: nil)
      expect { described_class.call(email: staff.email, password: 'pass1234') }.to raise_error(Auth::StaffLogin::NotVerifiedError)
    end
  end
end

