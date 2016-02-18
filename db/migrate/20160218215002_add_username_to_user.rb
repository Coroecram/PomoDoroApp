class AddUsernameToUser < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, presence: true, null: false, unique: true
  end
end
