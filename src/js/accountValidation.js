import { loginInnerHTML, signupInnerHTML } from './helpers/loginInnerHTML';

const loginContainer = document.querySelector('#loginContainer');
const introContainer = document.querySelector('#introContainer');

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

  chooseImgBtn.addEventListener('click', () => {
    chooseImgContainer.classList.remove('hidden');
    chooseImgOverlay.classList.remove('hidden');
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
}

clickHandler();

const signup = document.querySelector('#signup');
const login = document.querySelector('#login');

signup.addEventListener('click', () => {
  signupInnerHTML(loginContainer, introContainer);
  clickHandler();
  signup.className = 'w-full py-2 bg-green-500 rounded-tl-xl hover:outline';
  login.className =
    'w-full rounded-tr-xl py-2 shadow-[inset_0_0_6px_rgba(255,255,255,0.25)] hover:outline transition-shadow duration-300 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.25)]';
});

login.addEventListener('click', () => {
  loginInnerHTML(loginContainer, introContainer);
  login.className = 'w-full py-2 bg-green-500 rounded-tr-xl hover:outline';
  signup.className =
    'w-full rounded-tl-xl py-2 shadow-[inset_0_0_6px_rgba(255,255,255,0.25)] hover:outline transition-shadow duration-300 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.25)]';

  const loginName = document.querySelector('#loginName');
  const loginUserName = document.querySelector('#loginUserName');
  console.log(loginUserName);
  loginName.addEventListener('keyup', () => {
    loginUserName.innerHTML = loginName.value;
    console.log();
  });
});
