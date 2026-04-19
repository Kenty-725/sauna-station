# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Staff authentication', type: :request do
  let(:headers) do
    {
      'ACCEPT' => 'application/json',
      'CONTENT_TYPE' => 'application/json'
    }
  end

  let!(:facility) do
    Facility.create!(
      name: 'Sauna A',
      address_prefecture: 'Tokyo',
      address_line: 'Shibuya 1-1-1',
      description: 'desc',
      base_capacity: 0,
      base_price: 0,
      status: 'under_review'
    )
  end

  describe 'POST /api/v1/staffs (sign up)' do
    it 'creates staff and sends confirmation' do
      post '/api/v1/staffs', params: {
        staff: {
          name: 'Admin',
          email: 'admin@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          facility_id: facility.id
        }
      }.to_json, headers: headers

      expect(response).to have_http_status(:created)
      expect(response.parsed_body['message']).to eq('confirmation_email_sent')
      expect(response.parsed_body['email']).to eq('admin@example.com')
      expect(response.cookies['pending_staff_confirmation']).to be_present
      expect(ActionMailer::Base.deliveries.last.to).to include('admin@example.com')
    end
  end

  describe 'GET /api/v1/staffs/confirmation' do
    it 'confirms with valid token' do
      staff = Staff.create!(
        name: 'Admin',
        email: 'admin2@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        facility: facility
      )

      token = staff.confirmation_token
      get '/api/v1/staffs/confirmation', params: { confirmation_token: token }, headers: headers

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['message']).to eq('confirmed')
      expect(staff.reload.confirmed?).to be true
      expect(response.cookies['pending_staff_confirmation']).to be_blank
    end
  end

  describe 'GET /api/v1/staffs/confirmation/pending' do
    it 'returns the pending confirmation email from cookie context' do
      post '/api/v1/staffs', params: {
        staff: {
          name: 'Admin',
          email: 'admin-pending@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          facility_id: facility.id
        }
      }.to_json, headers: headers

      get '/api/v1/staffs/confirmation/pending', headers: headers

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['email']).to eq('admin-pending@example.com')
    end
  end

  describe 'POST /api/v1/staffs/confirmation' do
    it 'resends confirmation only for the signed-up unconfirmed staff' do
      post '/api/v1/staffs', params: {
        staff: {
          name: 'Admin',
          email: 'admin3@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          facility_id: facility.id
        }
      }.to_json, headers: headers

      expect do
        post '/api/v1/staffs/confirmation', headers: headers
      end.to change(ActionMailer::Base.deliveries, :count).by(1)

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['message']).to eq('confirmation_email_resent')
      expect(response.parsed_body['email']).to eq('admin3@example.com')
      expect(ActionMailer::Base.deliveries.last.to).to include('admin3@example.com')
    end

    it 'rejects resend after confirmation' do
      post '/api/v1/staffs', params: {
        staff: {
          name: 'Admin',
          email: 'admin4@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          facility_id: facility.id
        }
      }.to_json, headers: headers

      staff = Staff.find_by!(email: 'admin4@example.com')

      get '/api/v1/staffs/confirmation', params: { confirmation_token: staff.confirmation_token }, headers: headers

      post '/api/v1/staffs/confirmation', headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
