require 'faker'

FactoryGirl.define do
  factory :user do
    username  "examplename"
    email "testing@test.test"
    password "example123"
    password_confirmation "example123"
  end
end
