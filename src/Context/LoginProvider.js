import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = ({ target }) => {
    const { name } = target;
    return (name === 'email' ? setEmail(target.value) : setPassword(target.value));
  };

  const handleLogin = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const contextValue = {
    handleInput,
    email,
    password,
    handleLogin,
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
