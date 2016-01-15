FactoryGirl.define do
  factory :review do
    name Faker::Name.name   
    email Faker::Internet.email
    message Faker::Lorem.paragraph(7)    
  end

end
