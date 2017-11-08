import isEmail from 'validator/lib/isEmail';
import passwordStrengthTest from 'owasp-password-strength-test';

const registrationFieldValidator = {
  validateFirstName: (firstName = '') => {
    firstName = { value: firstName };
    if (!firstName.value) {
      firstName.error = 'First name is required';
    }
    return { firstName };
  },

  validateLastName: (lastName = '') => {
    lastName = { value: lastName };
    if (!lastName.value) {
      lastName.error = 'Last name is required';
    }
    return { lastName };
  },
  validateEmail: (email = '') => {
    email = { value: email };
    if (email.value && !isEmail(email.value)) {
      email.error = 'Must be a valid email address';
    }
    if (!email.value) {
      email.error = 'Email is required';
    }
    return { email };
  },
  validatePassword: (password = '') => {
    password = { value: password };
    if (password.value) {
      passwordStrengthTest.config({
        allowPassphrases: true,
        maxLength: 128,
        minLength: 10,
        minPhraseLength: 20,
        minOptionalTestsToPass: 4
      });
      const passwordTestResults = passwordStrengthTest.test(password.value);
      if (passwordTestResults.optionalTestErrors.length > 0) {
        password.error = passwordTestResults.optionalTestErrors[0];
      }
      if (passwordTestResults.requiredTestErrors.length > 0) {
        password.error = passwordTestResults.requiredTestErrors[0];
      }
    } else password.error = 'Password is required';
    return { password };
  },
  validateConfirmPassword: (confirmPassword = '', password) => {
    confirmPassword = { value: confirmPassword };
    if (password.value !== confirmPassword.value)
      confirmPassword.error = 'Passwords do not match';
    if (!confirmPassword.value)
      confirmPassword.error = 'Password confirmation required';
    return { confirmPassword };
  }
};

export const validateForm = form => {
  let hasErrors = false;
  const validatedForm = {
    firstName: registrationFieldValidator.validateFirstName(
      form.firstName.value
    ).firstName,
    lastName: registrationFieldValidator.validateLastName(form.lastName.value)
      .lastName,
    email: registrationFieldValidator.validateEmail(form.email.value).email,
    password: registrationFieldValidator.validatePassword(form.password.value)
      .password,
    confirmPassword: registrationFieldValidator.validateConfirmPassword(
      form.confirmPassword.value,
      form.password
    ).confirmPassword
  };
  Object.keys(validatedForm).forEach(field => {
    if (validatedForm[field].error) {
      hasErrors = true;
    }
  });
  return { form: validatedForm, hasErrors };
};

export const validateField = (field, value, confirmValue) => {
  return registrationFieldValidator[
    `validate${field.charAt(0).toUpperCase()}${field.slice(1)}`
  ](value, confirmValue);
};
