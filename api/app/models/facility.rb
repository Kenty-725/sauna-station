class Facility < ApplicationRecord
  has_many :staffs, dependent: :destroy

  enum status: {
    draft: "draft",       # 登録中（下書き）
    pending: "pending",   # 承認待ち
    active: "active",     # 公開中
    inactive: "inactive"  # 非公開
  }

  validates :name, presence: true
  validates :address_prefecture, presence: true
  validates :address_line, presence: true
  validates :base_capacity, numericality: { greater_than_or_equal_to: 0 }
  validates :base_price, numericality: { greater_than_or_equal_to: 0 }
end
