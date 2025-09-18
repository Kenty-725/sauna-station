class Staff < ApplicationRecord
  belongs_to :facility

  has_secure_password

  enum role: { admin: 'admin', staff: 'staff' }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
