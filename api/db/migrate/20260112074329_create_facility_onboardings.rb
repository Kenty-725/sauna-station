class CreateFacilityOnboardings < ActiveRecord::Migration[7.2]
  def change
    create_table :facility_onboardings do |t|
      t.references :staff, null: false, foreign_key: true
      t.references :facility, null: true, foreign_key: true

      t.integer :current_step, null: false, default: 0

      t.timestamps
    end

  end
end