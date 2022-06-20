import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './Context/LoginProvider';
import Foods from './pages/Foods';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
        {/* <Route route="*" component={ NotFound } /> */}
      </Switch>
    </LoginProvider>
  );
}

export default App;
