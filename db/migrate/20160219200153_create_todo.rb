class CreateTodo < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title, limit: 45, null: false
      t.text :description, limit: 140
      t.integer :expected_pomos, default: 1, null: false
      t.integer :completed_pomos, default: 0, null: false
      t.datetime :time_started
      t.datetime :expected_finished
      t.datetime :time_finished
      t.boolean :started, default: false, null: false
      t.boolean :finished, default: false, null: false
      t.integer :priority, default: 0, null: false
      t.integer :user_id, null: false, references: [:users, :id]

      t.timestamps
    end
    add_index :todos, :expected_pomos
    add_index :todos, :completed_pomos
    add_index :todos, :time_started
    add_index :todos, :time_finished
    add_index :todos, :user_id
  end
end
