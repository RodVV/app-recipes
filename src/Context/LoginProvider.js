import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = ({ target: { name, value } }) => (
    name === 'email' ? setEmail(value) : setPassword(value)
  );

  const handleLogin = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const contextValue = {
    handleInput,
    handleLogin,
    email,
    password,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
