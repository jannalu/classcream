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

ActiveRecord::Schema[8.1].define(version: 2022_12_26_201400) do
  create_table "assignments", force: :cascade do |t|
    t.integer "employee_id", null: false
    t.date "end_date"
    t.integer "pay_grade_id", null: false
    t.date "start_date"
    t.integer "store_id", null: false
    t.index ["employee_id"], name: "index_assignments_on_employee_id"
    t.index ["pay_grade_id"], name: "index_assignments_on_pay_grade_id"
    t.index ["store_id"], name: "index_assignments_on_store_id"
  end

  create_table "employees", force: :cascade do |t|
    t.boolean "active", default: true
    t.date "date_of_birth"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.string "phone"
    t.integer "role"
    t.string "ssn"
    t.string "username"
  end

  create_table "jobs", force: :cascade do |t|
    t.boolean "active", default: true
    t.text "description"
    t.string "name"
  end

  create_table "pay_grade_rates", force: :cascade do |t|
    t.date "end_date"
    t.integer "pay_grade_id", null: false
    t.float "rate"
    t.date "start_date"
    t.index ["pay_grade_id"], name: "index_pay_grade_rates_on_pay_grade_id"
  end

  create_table "pay_grades", force: :cascade do |t|
    t.boolean "active", default: true
    t.string "level"
  end

  create_table "shift_jobs", force: :cascade do |t|
    t.integer "job_id", null: false
    t.integer "shift_id", null: false
    t.index ["job_id"], name: "index_shift_jobs_on_job_id"
    t.index ["shift_id"], name: "index_shift_jobs_on_shift_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.integer "assignment_id", null: false
    t.date "date"
    t.time "end_time"
    t.text "notes"
    t.time "start_time"
    t.integer "status"
    t.index ["assignment_id"], name: "index_shifts_on_assignment_id"
  end

  create_table "stores", force: :cascade do |t|
    t.boolean "active", default: true
    t.string "city"
    t.string "name"
    t.string "phone"
    t.string "state"
    t.string "street"
    t.string "zip"
  end

  add_foreign_key "assignments", "employees"
  add_foreign_key "assignments", "pay_grades"
  add_foreign_key "assignments", "stores"
  add_foreign_key "pay_grade_rates", "pay_grades"
  add_foreign_key "shift_jobs", "jobs"
  add_foreign_key "shift_jobs", "shifts"
  add_foreign_key "shifts", "assignments"
end
