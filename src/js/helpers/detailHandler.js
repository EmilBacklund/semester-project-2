import draggableSlider from './horizontalScroll';
import postDetail from '../singleDetailPost';

const detailButton = document.querySelector('#hide-details');
const detailInfo = document.querySelector('#detailInfo');
const imageContainer = document.querySelector('#imageContainer');
const productContainer = document.querySelector('#productContainer');
const textHelper = document.querySelector('#textHelper');
const auctionContainer = document.querySelector('#auctionContainer');
const bidButtons = document.querySelector('#bidContainer');
let isLoaded = true;

function auctionHTML() {
  if (detailButton.attributes.src.value) {
    auctionContainer.innerHTML = `
    <div class="pt-8 px-5 md:pt-0 md:px-0 md:absolute md:bottom-1/2 md:translate-y-[calc(50%-46px)] w-full">
    <div class="text-xl inline-block">
        <h1 class="font-semibold">Backpack</h1>
        <p>Currently Highest Bid:</p>
    </div>
    <div id="slider" class="x-slide overflow-x-auto flex gap-5 w-full transition-all duration-200 cursor-grab">
    
   
    
    </div>
    </div>
    `;
  }
}

function showAuctionDetails() {
  if (detailButton.attributes.src.value === 'images/show-info.svg') {
    detailButton.attributes.src.value = 'images/hide-info.svg';
    auctionContainer.innerHTML = '';
  } else if (detailButton.attributes.src.value === 'images/hide-info.svg') {
    detailButton.attributes.src.value = 'images/show-info.svg';

    auctionHTML();
    postDetail();

    draggableSlider(document.querySelector('#slider'));
  }
}

detailButton.addEventListener('click', () => {
  detailInfo.classList.toggle('h-0');
  detailInfo.classList.toggle('py-0');
  imageContainer.classList.toggle('h-1/2');
  imageContainer.classList.toggle('rounded-b-2xl');
  productContainer.classList.toggle('h-[calc(100vh-72px)]');
  detailButton.classList.toggle('bottom-1/2');
  textHelper.classList.toggle('hidden');
  bidButtons.classList.toggle('h-0');
  showAuctionDetails();
});

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    if (isLoaded) {
      auctionHTML();
      postDetail();
      detailInfo.classList.remove('py-0');
      productContainer.classList.add('h-[calc(100vh-72px)]');
      bidButtons.classList.remove('h-0');
      draggableSlider(document.querySelector('#slider'));
      isLoaded = false;
    }
  } else if (detailButton.attributes.src.value === 'images/hide-info.svg') {
    auctionContainer.innerHTML = '';
    detailInfo.classList.remove('py-0');
    bidButtons.classList.add('h-0');
    productContainer.classList.remove('h-[calc(100vh-72px)]');
    isLoaded = true;
  } else {
    detailInfo.classList.add('py-0');
    isLoaded = true;
  }
});

function checkMediaSize() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    auctionHTML();
    postDetail();

    draggableSlider(document.querySelector('#slider'));
  } else if (detailButton.attributes.src.value === 'images/hide-info.svg') {
    postDetail();
  }
}

checkMediaSize();
