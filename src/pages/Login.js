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
        <input
          type="text"
          placeholder="Email"
          onChange={ handleInput }
          data-testid="email-input"
          name="email"
          value={ email }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={ handleInput }
          data-testid="password-input"
          name="password"
          value={ password }
        />
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
