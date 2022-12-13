const itemImage = document.querySelectorAll('.item-image');

const allImageInputs = document.querySelectorAll('.image-input');
const imgInputContainer = document.querySelectorAll('.imgInputContainer');

for (let i = 0; i < allImageInputs.length; i += 1) {
  allImageInputs[i].addEventListener('keyup', (e) => {
    if (!allImageInputs[2].value.length && !allImageInputs[1].value.length) {
      imgInputContainer[2].classList.add('hidden');
    }
    if (e.which === 13 && allImageInputs[i].value) {
      itemImage[i].src = allImageInputs[i].value;
      if (i < 2 && allImageInputs[0].value.length > 0) {
        imgInputContainer[i + 1].classList.remove('hidden');
        allImageInputs[i + 1].focus();
      }
    }
  });
}
