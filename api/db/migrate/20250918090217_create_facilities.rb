class CreateFacilities < ActiveRecord::Migration[7.2]
  def change
    create_table :facilities do |t|
      t.string  :name, null: false, limit: 200
      t.string  :phone, limit: 15
      t.string  :address_prefecture, null: false, limit: 50
      t.string  :address_line, null: false, limit: 255
      t.string  :postal_code, limit: 7
      t.text    :description
      t.text    :access_info
      t.integer :base_capacity, null: false, default: 0
      t.integer :base_price, null: false, default: 0
      t.string  :status, null: false, default: "draft"

      t.timestamps
    end
  end
end
