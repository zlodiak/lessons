FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "name#{i}" }
    sequence(:email) { |i| "email#{i}@email.com" }
    password 'password'
    phone 'phone'
    skype 'skype'
    info 'info'
    association(:gender)
  end
end