import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

const PASS_LENGTH = 6;
const verifyEmail = /\S+@\S+\.\S+/;

function Login() {
  const { handleInput, handleLogin, email, password } = useContext(Context);

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          E-mail
          <input
            type="text"
            id="email-input"
            placeholder="Email"
            onChange={ handleInput }
            data-testid="email-input"
            name="email"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            type="password"
            id="password-input"
            placeholder="Password"
            onChange={ handleInput }
            data-testid="password-input"
            name="password"
            value={ password }
          />
        </label>
        <Link to="/foods">
          <button
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleLogin }
            disabled={ password.length <= PASS_LENGTH || !verifyEmail.test(email) }
          >
            Login
          </button>
        </Link>
      </form>
    </div>

  );
}

export default Login;
