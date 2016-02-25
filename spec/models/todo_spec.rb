require 'spec_helper'

describe 'Todo' do
  let(:todo) { FactoryGirl.build(:todo) }
  before(:all) { @user = FactoryGirl.create(:user) }
  after(:all) { User.delete_all }

  it "has valid factory" do
    expect(todo).to be_valid
  end
  describe ":title" do
    it "needs presence" do
      todo.title = nil
      expect(todo).to_not be_valid
    end
    it "needs >= 3 characters" do
      todo.title = "it"
      expect(todo).to_not be_valid
    end
    it "can = 3 characters" do
      todo.title = "did"
      expect(todo).to be_valid
    end
    it "needs <= 45 characters" do
      todo.title = ("x" * 46)
      expect(todo).to_not be_valid
    end
  end
  describe ":description" do
    it "cannot be present" do
      todo.description = nil
      expect(todo).to be_valid
    end
    it "needs <= 140 characters" do
      todo.description = ("x" * 141)
      expect(todo).to_not be_valid
    end
    it "can = 140 characters" do
      todo.description = ("x" * 140)
      expect(todo).to be_valid
    end
  end
  describe ':expected_pomos' do
    it "needs >= 1 pomo" do
      todo.expected_pomos = 0
      expect(todo).to_not be_valid
    end
    it "needs <= 6 pomos" do
      todo.expected_pomos = 7
      expect(todo).to_not be_valid
    end
    it 'only accepts integers' do
      todo.expected_pomos = 4.5
      expect(todo).to_not be_valid
    end
    it 'defaults to 1' do
      todo.expected_pomos = nil
      todo.save
      expect(todo.expected_pomos).to eq(1)
    end
  end
  describe ':completed_pomos' do
    it 'default = 0' do
      todo.completed_pomos = nil
      todo.save!
      expect(todo.completed_pomos).to eq(0)
    end
    it '#pomo_completed!' do
      todo.pomo_completed!
      expect(todo.completed_pomos).to eq(1)
    end
    it 'can be more than 6' do
      todo.completed_pomos = 7
      expect(todo).to be_valid
    end
    it 'cannot be less than 0' do
      todo.completed_pomos = -2
      expect(todo).to_not be_valid
    end
    it 'needs an integer' do
      todo.completed_pomos = 1.5
      expect(todo).to_not be_valid
    end
  end
  describe ':time_started' do
    it '#start_now' do
      todo.start_now
      expect(todo.time_started.to_i).to be_within(10000).of(Time.now.to_i)
      expect(todo.started).to eq(true)
    end
    it 'cannot start in the future' do
      todo.time_started += 15000
      expect(todo).to_not be_valid
      expect(todo.started).to eq(false)
    end
  end
  describe ':started' do
    it 'defaults to false' do
      todo.started = nil
      todo.save
      expect(todo.started).to eq(false)
    end
  end
  describe ':finished, :time_finished' do
    it 'defaults to false' do
      todo.finished = nil
      todo.save
      expect(todo.finished).to eq(false)
    end
    it '#complete!' do
      todo.complete!
      expect(todo.finished).to eq(true)
      expect(todo.time_finished.to_i).to eq(Time.now.to_i)
    end
  end
  describe ':planned' do
    it 'cannot be before :time_started' do
      todo.time_started = Time.zone.now
      todo.planned = todo.time_started - 10000
      expect(todo).to_not be_valid
    end
  end
  describe ':priority' do
    it 'defaults to 0' do
      todo.priority = nil
      todo.save
      expect(todo.priority).to eq(0)
    end
  end
  describe ':user' do
    it 'needs to have a user_id' do
      todo.user_id = nil
      expect(todo).to_not be_valid
    end
    it 'has an associated user' do
      expect(todo.user.class).to eq(User)
    end
  end
end
