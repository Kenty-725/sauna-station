class CreateStaffs < ActiveRecord::Migration[7.2]
  def change
    create_table :staffs do |t|
      t.references :facility, null: true, foreign_key: true
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.datetime :email_verified_at
      t.string :role, null: false, default: 'staff'

      t.timestamps
    end
    add_index :staffs, :email, unique: true
  end
end

