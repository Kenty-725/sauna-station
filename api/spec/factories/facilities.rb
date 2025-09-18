FactoryBot.define do
  factory :facility do
    name { "テスト施設" }
    address_prefecture { "東京都" }
    address_line { "千代田区1-1-1" }
    base_capacity { 10 }
    base_price { 1000 }
    status { 0 }
  end
end

