# spec/authenticate_user_spec.rb
require 'rails_helper'

RSpec.describe AuthenticateUser do
  # Create test user
  let(:user) { create(:user) }
  # Valid request subject
  subject(:valid_auth_obj) { described_class.new(user.email, user.password) }
  # Invalid request subject
  subject(:invalid_auth_obj) { described_class.new('foo', 'bar') }

  # Test suite for AuthenticateUser#call
  describe '#call' do
    # Return token when valid request
    context 'when valid credentials' do
      it 'returns an auth token' do
        token = valid_auth_obj.call
        expect(token).not_to be_nil
      end
    end

    # Raise Authentication Error when invalid request
    context 'when invalid credentials' do
      it 'raises an authentication error' do
        expect { invalid_auth_obj.call }
          .to raise_error(
                ExceptionHandler::AuthenticationError,
                /Invalid credentials/
              )
      end
    end
  end
end
