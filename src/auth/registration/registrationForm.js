import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { registrationFormInput, registrationFormErrors } from './index';
import { apiPostAuthLogin } from '../../redux/reduxAPI';

import { validateForm, validateField } from './validateRegistration';

const RegistrationForm = props => {
  const {
    form,
    registrationFormInput,
    registrationFormErrors,
    apiPostAuthRegister
  } = props;

  const submitHandler = e => {
    e.preventDefault();
    const validatedForm = validateForm(form);
    if (validatedForm.hasErrors)
      return registrationFormErrors(validatedForm.form);
    const postForm = Object.keys(
      validatedForm.form
    ).reduce((submission, field) => {
      submission[field] = form[field].value;
      return submission;
    }, {});
    apiPostAuthRegister(postForm);
  };

  const changeHandler = e => {
    const { name, value } = e.target;
    registrationFormInput(validateField(name, value, form.password));
  };

  return (
    <Paper>
      <form onSubmit={submitHandler}>
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={10} sm={8}>
            <Typography type="display1">Register New User</Typography>
          </Grid>
          <Grid item xs={10} sm={8}>
            <TextField
              error={form.firstName.error ? true : false}
              helperText={form.firstName.error || null}
              onChange={changeHandler}
              name="firstName"
              label="First Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={10} sm={8}>
            <TextField
              error={form.lastName.error ? true : false}
              helperText={form.lastName.error || null}
              onChange={changeHandler}
              name="lastName"
              label="Last Name"
              fullWidth
            />
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
  form: state.auth.registration
});

export default connect(mapStateToProps, {
  registrationFormInput,
  apiPostAuthLogin,
  registrationFormErrors
})(RegistrationForm);
