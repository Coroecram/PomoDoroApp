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
  describe "username" do
    it "needs to be present" do
      remove_username
      expect(@user).to_not be_valid
    end
    # it "needs to be unique" do
    #   expect(@user).to_not be_valid
    # end
  end
    it "needs an email" do
      remove_email
      expect(@user).to_not be_valid
    end
    it "needs a password" do
      short_pw
      expect(@user).to_not be_valid
    end
    it "needs a password at least 8 characters" do
      @user.password = "123467"
      expect(@user).to_not be_valid
    end
    it "needs a matching password_confirmation" do
      change_pw_confirmation
      expect(@user).to_not be_valid
    end

end

def remove_username
  @user.username = nil
end

def remove_email
  @user.email = nil
end

def short_pw
  @user.password = nil
end

def change_pw_confirmation
  @user.password_confirmation = "not_matching"
end
