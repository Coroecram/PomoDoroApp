require 'faker'

FactoryGirl.define do
  factory :user do
    username  "examplename"
    email "testing@test.test"
    password "example123"
    password_confirmation "example123"
  end

  factory :todo do
    title 'Fake Project'
    description 'This is going to be so fake'
    expected_pomos 6
    completed_pomos 0
    time_started Time.now - 3000
    expected_finish Time.now
  end
end
