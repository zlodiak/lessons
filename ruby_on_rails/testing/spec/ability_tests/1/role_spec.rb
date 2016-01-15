require 'rails_helper'

RSpec.describe Role, type: :model do
  describe "user with role admin" do  
    before(:each) do
      @user = FactoryGirl.create(:user, :admin)
      @ability = Ability.new(@user)
    end
  
    it "can show review" do
      expect(@ability).to be_able_to(:read, Review)
    end

    it "can update review" do
      expect(@ability).to be_able_to(:update, Review)
    end    

    it "can create review" do
      expect(@ability).to be_able_to(:create, Review)
    end        

    it "can delete review" do
      expect(@ability).to be_able_to(:delete, Review)
    end  
  end  

  describe "user with role admin" do  
    before(:each) do
      @user = FactoryGirl.create(:user, :manager)
      @ability = Ability.new(@user)
    end
  
    it "can show review" do
      expect(@ability).to be_able_to(:read, Review)
    end

    it "can update review" do
      expect(@ability).to be_able_to(:update, Review)
    end    

    it "can create review" do
      expect(@ability).to be_able_to(:create, Review)
    end        

    it "cannot delete review" do
      expect(@ability).not_to be_able_to(:delete, Review)
    end  
  end  

  describe "user with role user" do  
    before(:each) do
      @user = FactoryGirl.create(:user, :user)
      @ability = Ability.new(@user)
    end
  
    it "can show review" do
      expect(@ability).to be_able_to(:read, Review)
    end

    it "cannot update review" do
      expect(@ability).not_to be_able_to(:update, Review)
    end    

    it "can create review" do
      expect(@ability).to be_able_to(:create, Review)
    end        

    it "cannot delete review" do
      expect(@ability).not_to be_able_to(:delete, Review)
    end  
  end    

  describe "user with role guest" do  
    before(:each) do
      @user = FactoryGirl.create(:user)
      @ability = Ability.new(@user)
    end
  
    it "can show review" do
      expect(@ability).to be_able_to(:read, Review)
    end

    it "cannot update review" do
      expect(@ability).not_to be_able_to(:update, Review)
    end    

    it "cannot create review" do
      expect(@ability).not_to be_able_to(:create, Review)
    end        

    it "cannot delete review" do
      expect(@ability).not_to be_able_to(:delete, Review)
    end  
  end    
end
