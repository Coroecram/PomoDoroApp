require 'spec_helper'

describe 'User' do
  before(:all) do
    @user = FactoryGirl.create(:user)
  end
  after(:all) do
    User.delete_all
  end

    it "has a valid factory" do
      expect(@user).to be_valid
    end

    it "needs a username" do
      @user.username = nil
      expect(@user).to_not be_valid
    end
    it "needs an email"
    it "needs a password"
    it "needs a password at least 8 characters"
    it "needs a matching password_confirmation"





end
