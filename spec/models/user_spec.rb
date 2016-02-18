require 'spec_helper'

describe 'User' do
  before(:each) do
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
    it "needs an email" do
      @user.email = nil
      expect(@user).to_not be_valid
    end
    it "needs a password" do
      @user.password = nil
      expect(@user).to_not be_valid
    end
    it "needs a password at least 8 characters" do
      @user.password = "123467"
      expect(@user).to_not be_valid
    end
    it "needs a matching password_confirmation" do
      @user.password_confirmation = "not_matching"
      expect(@user).to_not be_valid
    end





end
