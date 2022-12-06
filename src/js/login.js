import { LOGIN_ENDPOINT } from './settings/api';
import {
  saveCreditsInLocalStorage,
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
} from './settings/localStorage';
import loginUser from './helpers/loginUserRequest';
import validateInput from './helpers/validation';

function validateLoginInfo() {
  const loginForm = document.querySelector('#loginForm');
  const loginNameError = document.querySelector('#loginNameError');
  const loginEmailError = document.querySelector('#loginEmailError');
  const loginPasswordError = document.querySelector('#loginPasswordError');
  const loginName = document.querySelector('#loginName');
  const loginEmail = document.querySelector('#loginEmail');
  const loginPassword = document.querySelector('#loginPassword');

  const loginEmptyFields = document.querySelectorAll('.empty-field');
  const loginFields = document.querySelectorAll('.login-field');

  const loginMessage = document.querySelector('#loginUserName');

  for (let i = 0; i < loginFields.length; i += 1) {
    loginFields[i].addEventListener('keyup', () => {
      if (loginFields[i].value) {
        loginEmptyFields[i].classList.add('hidden');
      } else {
        loginEmptyFields[i].classList.remove('hidden');
      }
    });
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(loginForm);

    for (let i = 0; i < loginEmptyFields.length; i += 1) {
      if (!loginFields[i].value) {
        loginEmptyFields[i].classList.remove('hidden');
      } else {
        loginEmptyFields[i].classList.add('hidden');
      }
    }

    console.log(
      validateInput(
        loginName,
        loginNameError,
        loginPassword,
        loginPasswordError,
        loginEmail,
        loginEmailError,
      ),
    );

    console.log(loginNameError);
    console.log(loginEmailError);
    console.log(loginPasswordError);

    if (
      validateInput(
        loginName,
        loginNameError,
        loginPassword,
        loginPasswordError,
        loginEmail,
        loginEmailError,
      )
    ) {
      const userData = {
        email: loginEmail.value,
        password: loginPassword.value,
      };
      loginUser(LOGIN_ENDPOINT, userData)
        .then((data) => {
          saveUserInLocalStorage(data.user);
          saveTokenInLocalStorage(data.accessToken);
          saveCreditsInLocalStorage(data.credits);
          window.location.href = '/index.html';
        })
        .catch((errorMessage) => {
          loginMessage.innerHTML = `${errorMessage} 😓`;
          loginMessage.classList.remove('text-amber-400');
          loginMessage.classList.add('text-red-500');
        });
    } else {
      loginMessage.innerHTML = `Please fix errors 😥`;
      loginMessage.classList.remove('text-red-500');
      loginMessage.classList.add('text-amber-400');
    }
  });
}

export default validateLoginInfo;
