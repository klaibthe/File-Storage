import React, {
  Fragment,
  useState
} from 'react';
import { connect } from 'react-redux';
import {
  Link,
  Redirect
} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated, isSendingRequest }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const { name, username, email, password, passwordConfirmation } = formData;

  /**
   * On change event for form inputs
   * @param e
   */
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   *
   * @param e
   * @returns {*} View
   */
  const onSubmit = async e => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, username, email, password, passwordConfirmation });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/me/dashboard'/>;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'/> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirmation'
            minLength='6'
            value={passwordConfirmation}
            onChange={e => onChange(e)}
          />
        </div>
        {isSendingRequest ? (
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
            Registering...
          </button>
        ) : (
          <input type='submit' className='btn btn-primary' value='Register'/>
        )}
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isSendingRequest: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isSendingRequest: state.auth.isSendingRequest
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
