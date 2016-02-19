require 'spec_helper'

describe 'Todo' do
  before(:all) do
    @user = FactoryGirl.create(:user)
  end
  before(:each) do
    @todo = FactoryGirl.build(:todo)
    @todo.user_id = @user.id
  end
  after(:all) do
    User.delete_all
  end
  it "has a valid factory" do
    expect(@todo).to be_valid
  end
  describe ":title" do
    it "needs to be present" do
      @todo.title = nil
      expect(@todo).to_not be_valid
    end
    it "needs to be at least 3 characters" do
      @todo.title = "it"
      expect(@todo).to_not be_valid
    end
    it "needs to be less than 25 characters" do
      @todo.title = ("x" * 26)
      expect(@todo).to_not be_valid
    end
  end
  describe ":description" do
    it "need not to be present" do
      @todo.description = nil
      expect(@todo).to be_valid
    end
    it "needs to be less than 140 characters" do
      @todo.description = ("x" * 141)
      expect(@todo).to_not be_valid
    end
  end
  describe ':expected_pomos' do
    it "needs at least 1 pomo" do
      @todo.expected_pomos = 0
      expect(@todo).to_not be_valid
    end
    it 'cannot be less than 0' do
      @todo.expected_pomos = -2
      expect(@todo).to_not be_valid
    end
    it "needs less than 6 pomos" do
      @todo.expected_pomos = 7
      expect(@todo).to_not be_valid
    end
  end
  describe ':completed_pomos' do
    it 'defaults to 0' do
      @todo.completed_pomos = nil
      @todo.save!
      expect(@todo.completed_pomos).to eq(0)
    end
    it '#pomo_complete!' do
      @todo.pomo_complete!
      expect(@todo.completed_pomos).to eq(1)
    end
    it 'can be more than 6' do
      @todo.completed_pomos = 7
      expect(@todo).to be_valid
    end
    it 'cannot be less than 0' do
      @todo.completed_pomos = -2
      expect(@todo).to_not be_valid
    end
  end
  describe ':time_started' do
    it 'defaults to Time.now' do
      @todo.started = nil
      @todo.save!
      expect(@todo.time_started.to_i).to be_within(-100).of(Time.now.to_i)
    end
    it '#start_now' do
      @todo.start_now
      expect(@todo.time_started.to_i).to be_within(-100).of(Time.now.to_i)
      expect(@todo.started).to eq(true)
    end
    it 'cannot start in the future' do
      @todo.started += 5000
      expect(@todo).to_not be_valid
      expect(@todo.started).to eq(false)
    end
  end
  describe ':started' do
    it 'defaults to false' do
      @todo.save
      expect(@todo.started).to eq(false)
    end
  end
  describe ':finished, :finished_at' do
    it 'defaults to false' do
      @todo.save
      expect(@todo.finished).to eq(false)
    end
    it '#complete!' do
      @todo.complete!
      expect(@todo.finished).to eq(false)
      expect(@todo.finished_at).to be_within(-100).of(Time.now.to_i)
    end
  end
  describe ':expected_finish' do
    it 'cannot be less than :started_at' do
      @todo.started_at = Time.now
      @todo.expected_finish -= 1000
      expect(@todo).to_not be_valid
    end
  end
  describe ':priority' do
    it 'defaults to 0' do
      @todo.save
      expect(@todo.priority).to eq(0)
    end
  end
end
