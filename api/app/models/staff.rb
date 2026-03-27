class Staff < ApplicationRecord
  devise :database_authenticatable, :registerable, :rememberable, :validatable, :confirmable

  belongs_to :facility, optional: true

  enum :role, { admin: 0, staff: 1 }

  validates :name, presence: true, length: { maximum: 100 }

  # Keep email_verified_at in sync with Devise confirmable
  before_save :sync_email_verified_at

  private

  def sync_email_verified_at
    self.email_verified_at = confirmed_at
  end
end
