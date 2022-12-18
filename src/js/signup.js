import { loginInnerHTML, signupInnerHTML } from './helpers/loginInnerHTML';
import { REGISTER_ENDPOINT } from './settings/api';
import validateLoginInfo from './login';
import validateInput from './helpers/validation';

const loginContainer = document.querySelector('#loginContainer');
const introContainer = document.querySelector('#introContainer');

const signup = document.querySelector('#signup');
const login = document.querySelector('#login');

function clickHandler() {
  signupInnerHTML(loginContainer, introContainer);

  const chooseImgContainer = document.querySelector('#chooseImgContainer');
  const chooseImgOverlay = document.querySelector('#chooseImgOverlay');
  const chooseImgBtn = document.querySelector('#chooseImage');
  const closeButton = document.querySelector('#closeButton');
  const avatars = document.querySelectorAll('.avatar');
  const imageURLContainer = document.querySelector('#imageURLContainer');
  const imageURL = document.querySelector('#imageURL');
  const imgURLInput = document.querySelector('#imgURLInput');
  const imgURLInputError = document.querySelector('#imgURLInputError');
  const errorImage = document.querySelector('#errorImage');

  chooseImgBtn.addEventListener('click', () => {
    chooseImgContainer.classList.remove('hidden');
    chooseImgOverlay.classList.remove('hidden');
    errorImage.classList.add('hidden');
  });

  chooseImgOverlay.addEventListener('click', () => {
    chooseImgOverlay.classList.add('hidden');
    chooseImgContainer.classList.add('hidden');
  });

  closeButton.addEventListener('click', () => {
    chooseImgOverlay.classList.add('hidden');
    chooseImgContainer.classList.add('hidden');
  });

  for (let i = 0; i < avatars.length; i += 1) {
    avatars[i].addEventListener('click', () => {
      imageURL.innerHTML = avatars[i].src;
      chooseImgBtn.src = avatars[i].src;
      imageURLContainer.classList.remove('hidden');
      chooseImgOverlay.classList.add('hidden');
      chooseImgContainer.classList.add('hidden');
      imgURLInputError.classList.add('hidden');
      imgURLInput.value = '';
    });
  }

  imgURLInput.addEventListener('keyup', (e) => {
    if (e.which === 13 && !imgURLInput.value) {
      imgURLInputError.classList.remove('hidden');
    }
    if (e.which === 13 && imgURLInput.value.length > 0) {
      imageURL.innerHTML = imgURLInput.value;
      chooseImgBtn.src = imgURLInput.value;
      imageURLContainer.classList.remove('hidden');
      chooseImgOverlay.classList.add('hidden');
      chooseImgContainer.classList.add('hidden');
      imgURLInputError.classList.add('hidden');
    }
  });

  const signupName = document.querySelector('#name');
  const signupEmail = document.querySelector('#email');
  const signupPassword = document.querySelector('#password');
  const signupNameError = document.querySelector('#errorName');
  const signupEmailError = document.querySelector('#errorEmail');
  const signupPasswordError = document.querySelector('#errorPassword');
  const emptyFieldError = document.querySelectorAll('.empty-field');
  const allSignupFields = document.querySelectorAll('.signup-field');
  const submitButton = document.querySelector('#submit');

  for (let i = 0; i < emptyFieldError.length; i += 1) {
    emptyFieldError[i].classList.add('hidden');
    allSignupFields[i].addEventListener('keyup', () => {
      if (allSignupFields[i].value) {
        emptyFieldError[i].classList.add('hidden');
      } else {
        emptyFieldError[i].classList.remove('hidden');
      }
      if (signupName.value.match(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g)) {
        signupNameError.classList.remove('hidden');
      } else {
        signupNameError.classList.add('hidden');
      }
    });
  }

  signupPassword.addEventListener('keyup', () => {
    if (!signupPassword.value) {
      signupPasswordError.classList.add('hidden');
    }
  });

  const generalMessage = document.querySelector('#generalMessage');
  const signupForm = document.querySelector('#signupForm');

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    validateInput(
      signupName,
      signupNameError,
      signupPassword,
      signupPasswordError,
      signupEmail,
      signupEmailError,
    );

    let imageURLIsValid = false;
    if (!imageURL.innerHTML) {
      errorImage.classList.remove('hidden');
    } else {
      errorImage.classList.add('hidden');
      imageURLIsValid = true;
    }

    for (let j = 0; j < emptyFieldError.length; j += 1) {
      if (allSignupFields[j].value) {
        emptyFieldError[j].classList.add('hidden');
      } else {
        emptyFieldError[j].classList.remove('hidden');
      }
    }

    submitButton.scrollIntoView({ behavior: 'smooth' });

    const formIsValid =
      validateInput(
        signupName,
        signupNameError,
        signupPassword,
        signupPasswordError,
        signupEmail,
        signupEmailError,
      ) && imageURLIsValid;

    if (formIsValid) {
      const userData = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
        avatar: imageURL.innerHTML,
      };

      (async function registerUser() {
        const response = await fetch(REGISTER_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          loginInnerHTML(loginContainer, introContainer);
          login.className =
            'w-full py-2 bg-green-500 rounded-tr-xl hover:outline hover:z-10';
          signup.className =
            'w-full rounded-tl-xl py-2 shadow-[inset_0_0_6px_rgba(255,255,255,0.25)] hover:outline transition-shadow duration-300 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.25)] hover:z-10';

          const loginName = document.querySelector('#loginName');
          loginName.value = signupName.value;
          const loginEmail = document.querySelector('#loginEmail');
          loginEmail.value = signupEmail.value;
          const loginUserName = document.querySelector('#loginUserName');
          loginUserName.innerHTML = `${signupName.value} 😃`;

          return data;
        }

        const err = await response.json();
        const message = `${err.errors[0].message} 😬`;
        throw new Error(message);
      })().catch((err) => {
        generalMessage.classList.remove('text-white');
        generalMessage.classList.remove('hidden');
        generalMessage.classList.add('text-red-500');
        generalMessage.innerHTML = err;
      });
    } else {
      generalMessage.classList.remove('text-red-500');
      generalMessage.classList.remove('hidden');
      generalMessage.classList.add('text-white');
      generalMessage.innerHTML = `Please fill out all required fields 😘`;
    }
  });
}

clickHandler();

signup.addEventListener('click', () => {
  signupInnerHTML(loginContainer, introContainer);
  clickHandler();
  signup.className =
    'w-full py-2 bg-green-500 rounded-tl-xl hover:outline hover:z-10';
  login.className =
    'w-full rounded-tr-xl py-2 shadow-[inset_0_0_6px_rgba(255,255,255,0.25)] hover:outline transition-shadow duration-300 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.25)] hover:z-10';
});

login.addEventListener('click', () => {
  loginInnerHTML(loginContainer, introContainer);
  validateLoginInfo();
  login.className =
    'w-full py-2 bg-green-500 rounded-tr-xl hover:outline hover:z-10';
  signup.className =
    'w-full rounded-tl-xl py-2 shadow-[inset_0_0_6px_rgba(255,255,255,0.25)] hover:outline transition-shadow duration-300 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.25)] hover:z-10';
});
