FactoryBot.define do
  factory :staff do
    association :facility, factory: :facility, strategy: :build
    name { "テスト管理者" }
    sequence(:email) { |n| "admin#{n}@example.com" }
    password { "password123" }
    password_confirmation { "password123" }
    role { :admin }
  end
end

