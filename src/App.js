import React from 'react';
import Login from './pages/Login';
import LoginProvider from './Context/LoginProvider';

function App() {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
}

export default App;
