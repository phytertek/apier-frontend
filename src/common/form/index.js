const FORM_INPUT = 'FORM_INPUT';
// expects form name string and field object => 'formName', { fieldName: { value: '', error: '' } }
export const formInput = (formName, fields) => ({
  type: FORM_INPUT,
  payload: { formName, fields }
});

const FORM_CLEAR = 'CLEAR_FORM';
// expects a form name string => 'formName'
export const clearForm = formName => ({
  type: FORM_CLEAR,
  payload: formName
});

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FORM_INPUT:
      console.log(payload);
      return { ...state, [payload.formName]: { ...payload.fields } };
    case FORM_CLEAR:
      const updatedState = { ...state };
      delete updatedState[payload];
      return updatedState;
    default:
      return state;
  }
};
yarn