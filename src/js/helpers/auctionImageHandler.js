const itemImage = document.querySelectorAll('.item-image');

const allImageInputs = document.querySelectorAll('.image-input');
const imgInputContainer = document.querySelectorAll('.imgInputContainer');
const imageError = document.querySelector('#imageError');

for (let i = 0; i < allImageInputs.length; i += 1) {
  allImageInputs[i].addEventListener('keyup', (e) => {
    if (!allImageInputs[2].value.length && !allImageInputs[1].value.length) {
      imgInputContainer[2].classList.add('hidden');
    }
    if (e.which === 13 && allImageInputs[0].value.length > 0) {
      itemImage[i].src = allImageInputs[i].value;
      imageError.classList.add('hidden');
      if (i < 2) {
        imgInputContainer[i + 1].classList.remove('hidden');
        allImageInputs[i + 1].focus();
      }
    } else if (!allImageInputs[0].value.length) {
      imageError.classList.remove('hidden');
    }
  });
}
