const chooseImgContainer = document.querySelector('#chooseImgContainer');
const chooseImgOverlay = document.querySelector('#chooseImgOverlay');
const chooseImgBtn = document.querySelector('#chooseImage');

chooseImgBtn.addEventListener('click', () => {
  chooseImgContainer.classList.remove('hidden');
  chooseImgOverlay.classList.remove('hidden');
});

chooseImgOverlay.addEventListener('click', () => {
  chooseImgOverlay.classList.add('hidden');
  chooseImgContainer.classList.add('hidden');
});
