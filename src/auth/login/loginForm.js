import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { loginFormInput, loginFormErrors } from './index';
import { apiPostAuthLogin } from '../../redux/reduxAPI';

import { validateForm, validateField } from './validateLogin';

const LoginForm = props => {
  const { form, loginFormInput, loginFormErrors, apiPostAuthLogin } = props;

  const submitHandler = e => {
    e.preventDefault();
    const validatedForm = validateForm(form);
    if (validatedForm.hasErrors) return loginFormErrors(validatedForm.form);
    const postForm = Object.keys(
      validatedForm.form
    ).reduce((submission, field) => {
      submission[field] = form[field].value;
      return submission;
    }, {});
    apiPostAuthLogin(postForm);
  };

  const changeHandler = e => {
    const { name, value } = e.target;
    loginFormInput(validateField(name, value, form.password));
  };

  return (
    <Paper>
      <form onSubmit={submitHandler}>
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={10} sm={8}>
            <Typography type="display1">Login</Typography>
          </Grid>
          <Grid item xs={10} sm={8}>
            <TextField
              error={form.email.error ? true : false}
              helperText={form.email.error || null}
              onChange={changeHandler}
              name="email"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={10} sm={8}>
            <TextField
              error={form.password.error ? true : false}
              helperText={form.password.error || null}
              type="password"
              onChange={changeHandler}
              name="password"
              label="Password"
              fullWidth
            />
          </Grid>
          <Grid item xs={10} sm={8}>
            <TextField
              error={form.confirmPassword.error ? true : false}
              helperText={form.confirmPassword.error || null}
              type="password"
              onChange={changeHandler}
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
            />
          </Grid>
          <Grid item xs={10} sm={8}>
            <Button
              type="submit"
              raised={true}
              color="primary"
              onClick={submitHandler}
              style={{ width: '100%' }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const mapStateToProps = state => ({
  form: state.auth.login
});

export default connect(mapStateToProps, {
  loginFormInput,
  apiPostAuthLogin,
  loginFormErrors
})(LoginForm);
