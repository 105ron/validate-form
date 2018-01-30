'use strict';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
const emailFields = {
  valid: true,
  regex: emailRegex,
  visible: 'email-tick',
  hidden: 'email-cross',
  errorLocation: 'email-errors',
  error: '',
  errorMessage: 'Please enter valid email address'
};

const emailConfirmationFields = {
  valid: true,
  regex: emailRegex,
  visible: 'email-tick-confirmation',
  hidden: 'email-cross-confirmation',
  errorLocation: 'email-errors-confirmation',
  error: '',
  errorMessage: ['Confirmatation email must match', 'Please enter valid email address']
};

const passwordFields = {
  valid: true,
  regex: passwordRegex,
  visible: 'password-tick',
  hidden: 'password-cross',
  errorLocation: 'password-errors',
  error: '',
  errorMessage: 'Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?'
}

const hasClass = (element, className) => {
  const el = document.querySelector(`.${ element }`)
  return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

const addClass = (element, className) => {
  const el = document.querySelector(`.${ element }`)
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += ' ' + className;
}

const removeClass = (element, className) => {
  const el = document.querySelector(`.${ element }`)
  if (el.classList) el.classList.remove(className);
  else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}

const toggleProperties = (object, key1, key2) => (
  [object[key1], object[key2]] = [object[key2], object[key1]]);

const isValid = (field, regex) => ( regex.test(field) );

const resetErrorMessage = (fieldProperties) => {
  fieldProperties.valid = true;
  toggleProperties(fieldProperties, 'visible',  'hidden');
  fieldProperties.error = '';
}

const updateValidationDisplay = validation => {
  const errorDiv = document.getElementById(validation.errorLocation);
  errorDiv.innerText = validation.error;
  addClass(validation.hidden, 'hidden');
  removeClass(validation.visible, 'hidden');
};

const checkFirstField = (field, fieldProperties) => {
  if (isValid(field, fieldProperties.regex)) {
    if (!fieldProperties.valid) resetErrorMessage(fieldProperties); //If it's now valid apply the tick and remove errror message
  } else {
    if (fieldProperties.valid) toggleProperties(fieldProperties, 'visible',  'hidden') //only change the tick and cross if the valid property changes
    fieldProperties.valid = false;
    fieldProperties.error = fieldProperties.errorMessage;
  }
  updateValidationDisplay(fieldProperties);
}

const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', (event) => checkFirstField(event.target.value, emailFields));

const checkConfirmationField = (field, originalField, fieldProperties) => {
  if (field === originalField && isValid(field, fieldProperties.regex)) {
    if (!fieldProperties.valid) resetErrorMessage(fieldProperties); //If it's now valid apply the tick and remove errror message
  } else {
    if (fieldProperties.valid) toggleProperties(fieldProperties, 'visible',  'hidden') //only change the tick and cross if the valid property changes
    fieldProperties.valid = false;
    const errorAddress = (field !== originalField) ? 0 : 1; //determines which error message to display
    fieldProperties.error = fieldProperties.errorMessage[errorAddress] //updates error message
  }
  updateValidationDisplay(fieldProperties);
}

const emailInputConfirmation = document.getElementById('email-confirmation');
emailInputConfirmation.addEventListener('blur', (event) => checkConfirmationField(event.target.value, emailInput.value, emailConfirmationFields));

const checkPassword = (password) => {
  let valid = true;
  const passwordDisplay = {
    visible: 'password-tick',
    hidden: 'password-cross',
    errorLocation: 'password-errors',
    error: ''
  };
  if (!isValid(password, passwordRegex)) {
    valid = false;
    passwordDisplay.visible = 'password-cross';
    passwordDisplay.hidden = 'password-tick';
    passwordDisplay.error = '"Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?'
  }
  updateValidationDisplay(passwordDisplay);
  return valid;
}

const passwordInput = document.getElementById('password');
passwordInput.addEventListener('blur', (event) => checkFirstField(event.target.value, passwordFields));