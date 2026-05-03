# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Staff facility setup', type: :request do
  let(:headers) do
    {
      'ACCEPT' => 'application/json',
      'CONTENT_TYPE' => 'application/json'
    }
  end

  let(:facility_params) do
    {
      name: 'New Sauna',
      address_prefecture: 'Tokyo',
      address_line: 'Meguro 1-2-3',
      description: 'fresh',
      base_capacity: 10,
      base_price: 3500,
      status: 'under_review'
    }
  end

  describe 'POST /api/v1/staffs/sign_in' do
    it 'returns needs_facility_setup for admin without facility' do
      staff = Staff.create!(
        name: 'Admin',
        email: 'admin-no-facility@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        confirmed_at: Time.current
      )

      post '/api/v1/staffs/sign_in', params: {
        staff: {
          email: staff.email,
          password: 'password123'
        }
      }.to_json, headers: headers

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.dig('staff', 'needs_facility_setup')).to be(true)
      expect(response.parsed_body.dig('staff', 'facility_id')).to be_nil
    end

    it 'does not require setup for admin with facility' do
      facility = Facility.create!(
        name: 'Existing Sauna',
        address_prefecture: 'Tokyo',
        address_line: 'Shibuya 1-1-1',
        description: 'desc',
        base_capacity: 5,
        base_price: 2000,
        status: 'active'
      )
      staff = Staff.create!(
        name: 'Admin',
        email: 'admin-with-facility@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        facility: facility,
        confirmed_at: Time.current
      )

      post '/api/v1/staffs/sign_in', params: {
        staff: {
          email: staff.email,
          password: 'password123'
        }
      }.to_json, headers: headers

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.dig('staff', 'needs_facility_setup')).to be(false)
      expect(response.parsed_body.dig('staff', 'facility_id')).to eq(facility.id)
    end
  end

  describe 'GET /api/v1/staffs/me' do
    it 'returns the current staff with facility setup state' do
      staff = Staff.create!(
        name: 'Admin',
        email: 'admin-me@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        confirmed_at: Time.current
      )

      post '/api/v1/staffs/sign_in', params: {
        staff: {
          email: staff.email,
          password: 'password123'
        }
      }.to_json, headers: headers

      get '/api/v1/staffs/me', headers: headers

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.dig('staff', 'email')).to eq(staff.email)
      expect(response.parsed_body.dig('staff', 'needs_facility_setup')).to be(true)
    end

    it 'returns unauthorized when not signed in' do
      get '/api/v1/staffs/me', headers: headers

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'POST /api/v1/facilities' do
    it 'creates a facility and links it to the signed-in admin' do
      staff = Staff.create!(
        name: 'Admin',
        email: 'admin-create-facility@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        confirmed_at: Time.current
      )

      post '/api/v1/staffs/sign_in', params: {
        staff: {
          email: staff.email,
          password: 'password123'
        }
      }.to_json, headers: headers

      expect do
        post '/api/v1/facilities', params: { facility: facility_params }.to_json, headers: headers
      end.to change(Facility, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(response.parsed_body['facility_id']).to be_present
      expect(response.parsed_body.dig('staff', 'facility_id')).to eq(staff.reload.facility_id)
      expect(response.parsed_body.dig('staff', 'needs_facility_setup')).to be(false)
    end

    it 'rejects facility creation for non-admin staff' do
      staff = Staff.create!(
        name: 'Staff',
        email: 'staff-create-facility@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        role: :staff,
        confirmed_at: Time.current
      )

      post '/api/v1/staffs/sign_in', params: {
        staff: {
          email: staff.email,
          password: 'password123'
        }
      }.to_json, headers: headers

      post '/api/v1/facilities', params: { facility: facility_params }.to_json, headers: headers

      expect(response).to have_http_status(:forbidden)
    end

    it 'rejects facility creation when the admin already has a facility' do
      facility = Facility.create!(
        name: 'Existing Sauna',
        address_prefecture: 'Tokyo',
        address_line: 'Shibuya 1-1-1',
        description: 'desc',
        base_capacity: 5,
        base_price: 2000,
        status: 'active'
      )
      staff = Staff.create!(
        name: 'Admin',
        email: 'admin-existing-facility@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        facility: facility,
        confirmed_at: Time.current
      )

      post '/api/v1/staffs/sign_in', params: {
        staff: {
          email: staff.email,
          password: 'password123'
        }
      }.to_json, headers: headers

      post '/api/v1/facilities', params: { facility: facility_params }.to_json, headers: headers

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
