class Staff < ApplicationRecord
  belongs_to :facility, optional: true

  has_secure_password

  enum :role, { 
    admin: 0, # 管理者
    staff: 1  # スタッフ
  }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
