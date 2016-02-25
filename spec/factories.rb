require 'faker'

FactoryGirl.define do
  factory :user do
    factory_password = Faker::Internet.password
    username Faker::Lorem.characters(12)
    email Faker::Internet.email
    password factory_password
    password_confirmation factory_password
  end

  factory :todo do
    title Faker::StarWars.character
    description Faker::StarWars.quote
    expected_pomos Faker::Number.between(1, 6)
    completed_pomos 0
    started false
    finished false
    time_started (Time.zone.now - 3000)
    planned (Time.zone.now + 10000)
    user_id 1
  end
end
