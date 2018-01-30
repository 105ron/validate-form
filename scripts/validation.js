'use strict';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/



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

const isValid = (field, regex) => ( regex.test(field) );

const updateValidationDisplay = validation => {
  const errorDiv = document.getElementById(validation.errorLocation);
  errorDiv.innerText = validation.error;
  addClass(validation.hidden, 'hidden');
  removeClass(validation.visible, 'hidden');
};

const checkEmail = (email) => {
  let valid = true;
  const emailDisplay = {
    visible: 'email-tick',
    hidden: 'email-cross',
    errorLocation: 'email-errors',
    error: ''
  };
  if (!isValid(email, emailRegex)) {
    valid = false;
    emailDisplay.visible = 'email-cross';
    emailDisplay.hidden = 'email-tick';
    emailDisplay.error = 'Please enter valid email address'
  }
  updateValidationDisplay(emailDisplay);
  return valid;
}

const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', (event) => checkEmail(event.target.value));

const checkEmailConfirmation = (emailConfirmation) => {
  let valid = true;
  const email = emailInput.value;
  const emailDisplay = {
    visible: 'email-tick-confirmation',
    hidden: 'email-cross-confirmation',
    errorLocation: 'email-errors-confirmation',
    error: ''
  };
  if (email !== emailConfirmation || !isValid(email, emailRegex)) {
    valid = false;
    emailDisplay.visible = 'email-cross-confirmation';
    emailDisplay.hidden = 'email-tick-confirmation';
    email !== emailConfirmation 
      ? emailDisplay.error = 'Confirmatation email must match'
      : emailDisplay.error = 'Please enter valid email address';
  }
  updateValidationDisplay(emailDisplay);
  return valid;
}

const emailInputConfirmation = document.getElementById('email-confirmation');
emailInputConfirmation.addEventListener('blur', (event) => checkEmailConfirmation(event.target.value));





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
passwordInput.addEventListener('blur', (event) => checkPassword(event.target.value));