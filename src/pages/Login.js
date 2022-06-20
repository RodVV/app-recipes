import React, { useContext } from 'react';
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
          disabled={ password.length <= PASS_LENGTH || !verifyEmail.test(email) }
          // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
        >
          Login
        </button>
      </form>
    </div>

  );
}

export default Login;
