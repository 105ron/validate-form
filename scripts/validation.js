'use strict';
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

const isValidEmail = email => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const updateValidationDisplay = validation => {
  const errorDiv = document.getElementById(validation.errorLocation);
  errorDiv.innerText = validation.error;
  addClass(validation.hidden, 'hidden');
  removeClass(validation.visible, 'hidden');
};

const checkEmail = (event) => {
  const email = event.target.value;
  const emailDisplay = {
    visible: 'email-tick',
    hidden: 'email-cross',
    errorLocation: 'email-errors',
    error: ''
  };
  if (!isValidEmail(email)) {
    emailDisplay.visible = 'email-cross';
    emailDisplay.hidden = 'email-tick';
    emailDisplay.error = 'Please enter valid email address'
  }
  updateValidationDisplay(emailDisplay);
}

const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', checkEmail);

const checkEmailConfirmation = (event) => {
  const emailConfirmation = event.target.value;
  const email = emailInput.value;
  const emailDisplay = {
    visible: 'email-tick-confirmation',
    hidden: 'email-cross-confirmation',
    errorLocation: 'email-errors-confirmation',
    error: ''
  };
  if (email !== emailConfirmation) {
    emailDisplay.visible = 'email-cross-confirmation';
    emailDisplay.hidden = 'email-tick-confirmation';
    emailDisplay.error = 'Email addresses must match'
  }
  updateValidationDisplay(emailDisplay);
}

const emailInputConfirmation = document.getElementById('email-confirmation');
emailInputConfirmation.addEventListener('blur', checkEmailConfirmation);