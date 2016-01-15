FactoryGirl.define do
  factory :user do
    sequence(:email){ |i| "us#{i}@ad.ad" }
    password 'qwertyui'
    password_confirmation{ |u| u.password } 

    trait :user do
      association :role, factory: :user_role
    end

    trait :manager do
      association :role, factory: :manager_role
    end

    trait :admin do
      association :role, factory: :admin_role
    end      
  end 
end

