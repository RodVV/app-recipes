import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = ({ target }) => {
    const { name } = target;
    if (name === 'email') {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  };

  const contextValue = {
    handleInput,
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
