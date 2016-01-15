documents_controller_test.rb

require 'test_helper'

class DocumentsControllerTest < ActionController::TestCase

  fixtures :documents

  #setup do
  #  @document = documents(:one)
  #end

  test "should get index with parameter page" do
    get :index, :page => 3
    assert_response :success
  end

  test "should get index without parameter page" do
    get :index
    assert_response :success
  end  

  test "should render index template for index action" do
    get :index
    assert_template 'index'
    assert_template layout: "layouts/application"
  end   

  test "should get success response for show" do
    get :show, {'id' => "1"}
    assert_response :success
  end     

  test "should document index page have text Listing documents-" do
    get :index
    assert_select 'h1', 'Listing documents-'
  end    

  test "should document index page have text to admin" do
    get :index
    assert_select 'a', 'to admin'
  end    

  test "should document on show 1 page have text title1" do
    get :show, {'id' => "1"}
    assert_select 'h2', 'title1'
  end  

  test "should document on show 1 page dont have forms" do
    get :show, {'id' => "1"}
    assert_select 'form', false
  end       

  test "should document on index assigned var documents" do
    get :index
    assert_not_nil assigns(:documents)
  end     

  test "should document on show 2 page route check" do
    get :show, {'id' => "2"}
    assert_routing '/documents/2', { controller: "documents", action: "show", id: "2" }
  end  


  #test "should create document" do
  #  post :create, document: {title: 'Hi', body: 'This is my first article.'}

   # assert_equal 'Doc create', flash[:success]
  #end



end


============
session_helper.rb

require 'test_helper'

class SessionsHelperTest < ActionView::TestCase
	include SessionsHelper

  test 'should return value qwerty' do
    assert_not_nil ret_val
    assert_equal 'qwerty', ret_val
    assert_not_equal 'qwerty2', ret_val
  end
end









module	SessionsHelper
  def ret_val
    @val = 'qwerty'
  end
end

============

documents fixtures

one: 
  id: 1
  title: 'title1'
  body: 'body1'

two: 
  id: 2
  title: 'title2'
  body: 'body2'

three: 
  id: 3
  title: 'title3'
  body: 'body3'  


============



============

admin/documents_controller.rb

require 'test_helper'

class Admin::DocumentsControllerTest < ActionController::TestCase

  fixtures :documents  

  test "should document on new page have input fields" do
    get :new
    assert_select 'form input', 3
  end     

  test "should admin-document on show 1 page have title1" do
    get :show, {'id' => "1"}
    assert_select 'h2.title_h2', 'title1'
  end    

  test "should destroy document" do
    document = documents(:one)
    assert_difference('Document.count', -1) do
      delete :destroy, { id: 1}
    end
  end  

  test "should admin-document on show 2 page route check" do
    get :show, {'id' => "2"}
    assert_routing '/admin/documents/2', { controller: "admin/documents", action: "show", id: "2" }
  end    

end


============
============
============
============
============
============
============
============
============
============
============
============