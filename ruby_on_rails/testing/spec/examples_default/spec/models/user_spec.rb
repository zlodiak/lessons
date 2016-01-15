require 'spec_helper'

=begin
describe User do
  it 'should' do
    (1 + 1).should == 2
  end
end


RSpec.describe User, :type => :model do
  it "should create user" do
    user1 = User.create!(:name => 'name1', :email => 'email1@ad.ad', :diary_name => 'd1', :password => 'qwerty', :password_confirmation => 'qwerty')
    user2 = User.create!(:name => 'name2', :email => 'email2@ad.ad', :diary_name => 'd2', :password => 'qwerty', :password_confirmation => 'qwerty')

    user2.name.should == 'name2'

  end
end

class RSpecGreeter
  def greet
    "Hello RSpec!"
  end
end

describe "RSpec Greeter" do
  it "should say 'Hello RSpec!' when it receives the greet() message" do
    greeter = RSpecGreeter.new
    greeting = greeter.greet
    expect(greeting).to eq("Hello RSpec!")
    # greeting.should == "Hello RSpec!"
  end
end
=end

