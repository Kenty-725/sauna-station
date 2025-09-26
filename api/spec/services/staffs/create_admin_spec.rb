require 'rails_helper'

RSpec.describe Staffs::CreateAdmin do
  describe '.call' do
    it 'creates an admin staff, generates token and sends mail' do
      ActionMailer::Base.deliveries.clear

      params = {
        name: '管理者A',
        email: 'admin_a@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }

      staff = described_class.call(params)

      expect(staff).to be_persisted
      expect(staff.role).to eq('admin')
      expect(staff.confirmation_token).to be_present
      expect(ActionMailer::Base.deliveries.size).to eq(1)
    end

    it 'returns non-persisted staff when validation fails' do
      staff = described_class.call({})
      expect(staff).not_to be_persisted
    end
  end
end

