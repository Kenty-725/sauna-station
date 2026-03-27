# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2026_03_23_121000) do
  create_table "facilities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", limit: 200, null: false
    t.string "phone", limit: 15
    t.string "address_prefecture", limit: 50, null: false
    t.string "address_line", null: false
    t.string "postal_code", limit: 7
    t.text "description"
    t.text "access_info"
    t.integer "base_capacity", default: 0, null: false
    t.integer "base_price", default: 0, null: false
    t.string "status", default: "under_review", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_prefecture"], name: "index_facilities_on_address_prefecture"
    t.index ["status"], name: "index_facilities_on_status"
  end

  create_table "staffs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "name", limit: 100, null: false
    t.bigint "facility_id"
    t.integer "role", default: 0, null: false
    t.datetime "email_verified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_staffs_on_confirmation_token", unique: true
    t.index ["email"], name: "index_staffs_on_email", unique: true
    t.index ["facility_id"], name: "index_staffs_on_facility_id"
    t.index ["reset_password_token"], name: "index_staffs_on_reset_password_token", unique: true
  end

  add_foreign_key "staffs", "facilities"
end
