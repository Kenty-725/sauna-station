# frozen_string_literal: true

class Facility < ApplicationRecord
  has_many :staffs, dependent: :destroy

  validates :name, presence: true, length: { maximum: 200 }
  validates :address_prefecture, presence: true, length: { maximum: 50 }
  validates :address_line, presence: true, length: { maximum: 255 }
  validates :base_capacity, numericality: { greater_than_or_equal_to: 0 }
  validates :base_price, numericality: { greater_than_or_equal_to: 0 }
  validates :status, presence: true, inclusion: { in: %w[active inactive under_review] }
end
