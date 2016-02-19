require 'spec_helper'

describe 'User' do
    let(:user) { FactoryGirl.create(:user) }

  after(:all) do
    User.delete_all
  end
  it "has a valid factory" do
    expect(user).to be_valid
  end
  describe "username" do
    it "needs to be present" do
      remove_username
      expect(user).to_not be_valid
    end
    it "needs to be at least 6 characters" do
      user.username = "four"
      expect(user).to_not be_valid
    end
    it "needs to be less than 30 characters" do
      user.username = ("x" * 31)
      expect(user).to_not be_valid
    end
    it "needs to be unique" do
      user2 = user.dup
      user2.email = "different@email.com"
      expect(user2).to_not be_valid
    end
  end
  describe "email" do
    it "needs to be present" do
      remove_email
      expect(user).to_not be_valid
    end
    it "needs to be less than 50 characters" do
      user.email = ("x" * 44 + "@51.com")
      expect(user).to_not be_valid
    end
    it "needs to be unique" do
      user2 = user.dup
      user2.username = "different"
      expect(user2).to_not be_valid
    end
  end
  describe 'password' do
    it "needs a password" do
      short_pw
      expect(user).to_not be_valid
    end
    it "needs a password at least 8 characters" do
      user.password = "123467"
      expect(user).to_not be_valid
    end
    it "needs a matching password_confirmation" do
      change_pw_confirmation
      expect(user).to_not be_valid
    end
  end

end

def remove_username
  user.username = nil
end

def remove_email
  user.email = nil
end

def short_pw
  user.password = nil
end

def change_pw_confirmation
  user.password_confirmation = "not_matching"
end
