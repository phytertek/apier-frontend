import React from 'react';
import { Route } from 'react-router-dom';

import RegistrationForm from './auth/registration/registrationForm';
import LoginForm from './auth/login/loginForm';

import Typography from 'material-ui/Typography';

const App = () => {
  return (
    <div>
      <Typography type="display4">Insert NavBar here</Typography>
      <Route exact path="/" component={LoginForm} />
      <Route path="/new-user-registration" component={RegistrationForm} />
    </div>
  );
};

export default App;
