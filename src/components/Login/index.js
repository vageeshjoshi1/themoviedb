import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty, get } from 'lodash';
import { Button, Form, FormFeedback, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { validateEmail, validatePassword } from '../../utils/helpers';

import './styles.scss';

const DEFAULT_ERRORS = {
  email: false,
  password: false
};

const Login = ({ email = '', password = '', saveUserData }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email,
    password
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);

  const validationMapper = {
    email: validateEmail,
    password: validatePassword
  };

  useEffect(() => {
    const auth_token = sessionStorage.getItem('auth_token') || null;
    if (!isEmpty(auth_token)) {
      history('/');
    }
  }, []);

  const onFormChange = (event) => {
    const field = get(event, 'target.name');
    const value = get(event, 'target.value');
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateField = (event) => {
    const field = get(event, 'target.name');
    const value = get(event, 'target.value');
    const error = validationMapper[field](value);
    setErrors({
      ...errors,
      [field]: error
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const checkErrors = () => {
    return !!errors.email || !!errors.password || !(!!formData.email && !!formData.password);
  };

  const onLoginClick = (event) => {
    event.preventDefault();
    if (!checkErrors()) {
      saveUserData(formData);
      sessionStorage.setItem('auth_token', true);
      history('/');
    }
  };

  return (
    <div className="login-screen">
      <div className="background-image" />
      <Form className="login-form" onSubmit={onLoginClick} onChange={onFormChange}>
        <h2 className="heading">Login Now</h2>
        <FormGroup>
          <Input
            type="email"
            defaultValue={formData.email}
            name="email"
            placeholder="Type your email here"
            onBlur={validateField}
            invalid={!!errors.email}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            defaultValue={formData.password}
            name="password"
            placeholder="Password"
            onBlur={validateField}
            invalid={!!errors.password}
          />
          {!passwordVisible ? (
            <Button className="icon-btn" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={faEye} />
            </Button>
          ) : (
            <Button className="icon-btn" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={faEyeSlash} />
            </Button>
          )}
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        <Button color="primary" disabled={checkErrors()}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData: (payload) => dispatch({ type: 'SAVE_EMAIL_PASSWORD', payload })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
