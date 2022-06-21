import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import { SIX, verifyEmail } from './helpers/index';

function Login() {
  const { handleInput, handleLogin, email, password } = useContext(Context);

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          E-mail
          <input
            type="text"
            data-testid="email-input"
            id="email-input"
            name="email"
            placeholder="Email"
            value={ email }
            onChange={ handleInput }
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            type="password"
            data-testid="password-input"
            id="password-input"
            name="password"
            placeholder="Password"
            value={ password }
            onChange={ handleInput }
          />
        </label>
        <Link to="/foods">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ password.length <= SIX || !verifyEmail.test(email) }
            onClick={ handleLogin }
          >
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
