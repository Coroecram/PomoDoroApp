class AddGuestToUsers < ActiveRecord::Migration
  def change
    add_column :users, :guestname, :string
  end
end
