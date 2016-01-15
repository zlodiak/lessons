FactoryGirl.define do
  factory :user_role, class: Role do
    title 'user'
  end

  factory :manager_role, class: Role do
    title 'manager'
  end

  factory :admin_role, class: Role do
    title 'admin'
  end
end