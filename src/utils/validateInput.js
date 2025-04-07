// validateInput.js
// Exports 3 functsion to validate email, password, and username
// Returns a boolean: true if valid, else false

import validator from "validator";

const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

const isValidEmail = (email) => {
  return validator.isEmail(email) && validator.isLength(email, {min: 3, max:128});
}

const isValidPassword = (password) => {
  return validator.isLength(password, {min: 8, max:20}) && passwordregex.test(password)
}

const isValidUsername = (username) => {
  return validator.isLength(username, {min: 3, max:64});
}

export { isValidEmail, isValidPassword, isValidUsername }