require 'test_helper'

class SessionsHelperTest < ActionView::TestCase
	include SessionsHelper

  test 'should return value qwerty' do
    assert_not_nil ret_val
    assert_equal 'qwerty', ret_val
    assert_not_equal 'qwerty2', ret_val
  end
end
