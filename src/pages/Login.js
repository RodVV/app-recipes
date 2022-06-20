import React, { useContext } from 'react';
import Context from '../Context/Context';

function Login() {
  const { handleInput, handleLogin } = useContext(Context);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Email"
          onChange={ handleInput }
          data-testid="email-input"
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={ handleInput }
          data-testid="password-input"
          name="password"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleLogin }
          // disabled={ isValid }
        >
          Login
        </button>
      </form>
    </div>

  );
}

export default Login;
