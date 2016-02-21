class ChangeExpectedToPlanned < ActiveRecord::Migration
  def change
    rename_column :todos, :expected_finished, :planned
  end
end
