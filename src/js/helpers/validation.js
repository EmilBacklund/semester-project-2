function validateEmail(mail) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  if (mail.match(regEx)) {
    return true;
  }
  return false;
}

function validateInput(
  name,
  nameError,
  password,
  passwordError,
  email,
  emailError,
) {
  let nameIsValid = false;
  if (
    name.value.trim().length > 0 &&
    !name.value.match(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g)
  ) {
    nameIsValid = true;
    nameError.classList.add('hidden');
  } else if (name.value.match(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g)) {
    nameError.classList.remove('hidden');
  }

  let passwordIsValid = false;
  if (password.value.trim().length > 7) {
    passwordError.classList.add('hidden');
    passwordIsValid = true;
  } else if (
    password.value.trim().length < 7 &&
    password.value.trim().length > 0
  ) {
    passwordError.classList.remove('hidden');
  }

  let emailIsValid = false;
  if (email.value.trim().length && validateEmail(email.value)) {
    emailError.classList.add('hidden');
    emailIsValid = true;
  } else if (!validateEmail(email.value)) {
    emailError.classList.remove('hidden');
  }

  if (nameIsValid && emailIsValid && passwordIsValid) {
    return true;
  }
  return false;
}

export default validateInput;
