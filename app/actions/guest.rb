require 'faker'
I18n.reload!

class Guest
  LOCATIONS = ['Troy', 'Mount Ida', 'Mount Olympus', 'Garden of the Hesperides',
               'Aegean Sea', 'Crete', 'Hades', 'Samos', 'Atlantis', 'Mycenae']

  attr_reader :account

  def initialize
    new_guest_user
  end

  private
  def new_guest_user
    password = Faker::Internet.password
    @account = User.create!({"email"=>Faker::Internet.email, "username"=>Faker::Lorem.characters(10),
              "password"=>password, "password_confirmation"=>password})
    guest_todos
  end

  def guest_todos
    titles = LOCATIONS.shuffle
    10.times do
      started = Faker::Boolean.boolean
      finished = Faker::Boolean.boolean if started
      time_started = Faker::Time.between(7.days.ago, 2.days.ago, :all) if started
      time_finished = Faker::Time.between(2.days.ago, Time.now, :all) if finished
      Todo.create!({title: titles.shift, description: Faker::Lorem.sentence,
                   expected_pomos: Faker::Number.between(1, 6), completed_pomos: Faker::Number.between(0, 5),
                   started: started, finished: finished, time_started: time_started, time_finished: time_finished,
                   user_id: @account.id})
    end
  end
end

# {"user"=>{"email"=>"adgadg@addg.com", "username"=>"adgasdgd", "password"=>"adgdagdag", "password_confirmation"=>"adgfadfda"},
# "controller"=>"users/registrations", "action"=>"create", "format"=>"json",
# "registration"=>{"user"=>{"email"=>"adgadg@addg.com", "username"=>"adgasdgd", "password"=>"adgdagdag",
#   "password_confirmation"=>"adgfadfda"}}}
