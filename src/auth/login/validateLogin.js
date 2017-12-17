const loginFieldValidator = {
  validateEmail: (email = '') => {
    email = { value: email };
    if (!email.value) {
      email.error = 'Email is required';
    }
    return { email };
  },
  validatePassword: (password = '') => {
    password = { value: password };
    if (!password.value) password.error = 'Password is required';
    return { password };
  }
};

export const validateForm = form => {
  let hasErrors = false;
  const validatedForm = {
    email: loginFieldValidator.validateEmail(form.email.value).email,
    password: loginFieldValidator.validatePassword(form.password.value).password
  };
  Object.keys(validatedForm).forEach(field => {
    if (validatedForm[field].error) {
      hasErrors = true;
    }
  });
  return { form: validatedForm, hasErrors };
};

export const validateField = (field, value) => {
  return loginFieldValidator[
    `validate${field.charAt(0).toUpperCase()}${field.slice(1)}`
  ](value);
};
