const detailButton = document.querySelector('#hide-details');
const detailInfo = document.querySelector('#detailInfo');
const imageContainer = document.querySelector('#imageContainer');
const productContainer = document.querySelector('#productContainer');
const textHelper = document.querySelector('#textHelper');
const auctionContainer = document.querySelector('#auctionContainer');
const bidButtons = document.querySelector('#bidContainer');

function draggableSlider(slide) {
  let isDown = false;
  let startX;
  let scrollLeft;
  const slider = slide;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });
}

export default draggableSlider;

function auctionHTML() {
  if (detailButton.attributes.src.value) {
    auctionContainer.innerHTML = `
    <div class="pt-8 px-5 md:pt-0 md:px-0 md:absolute md:bottom-1/2 md:translate-y-[calc(50%-46px)] w-full">
    <div class="text-xl inline-block">
        <h1 class="font-semibold">Backpack</h1>
        <p>Currently Highest Bid:</p>
    </div>
    <div id="slider" class="x-slide overflow-x-auto flex gap-5 w-full transition-all duration-200 cursor-grab">
    <div class="flex-none relative">
        <img
          src="images/ticket.svg"
          alt=""
        />
        <div class="flex gap-4 absolute inset-1/2 -translate-x-1/4 w-full -translate-y-1/4  items-center">
        <div class="w-8 h-8 shrink-0 bg-green-700 rounded-xl text-xl font-semibold text-center leading-8">1</div>
        <div>
        <p class="text-neutral-500">Your Bet</p>
        <p class="text-xl text-black font-normal">600 CR</p>
        </div>
        </div>
    </div>
    <div class="flex-none relative">
        <img
          src="images/ticket.svg"
          alt=""
        />
        <div class="flex gap-4 absolute inset-1/2 -translate-x-1/4 w-full -translate-y-1/4 items-center">
        <div class="w-8 h-8 shrink-0 bg-green-700 rounded-xl text-xl font-semibold text-center leading-8">2</div>
        <div>
        <p class="text-neutral-500">Gustav</p>
        <p class="text-xl text-black font-normal">450 CR</p>
        </div>
        </div>
    </div>
    <div class="flex-none relative">
        <img
          src="images/ticket.svg"
          alt=""
        />
        <div class="flex gap-4 absolute inset-1/2 -translate-x-1/4 w-full -translate-y-1/4 items-center">
        <div class="w-8 h-8 shrink-0 bg-green-700 rounded-xl text-xl font-semibold text-center leading-8">3</div>
        <div>
        <p class="text-neutral-500">Martin</p>
        <p class="text-xl text-black font-normal">300 CR</p>
        </div>
        </div>
    </div>
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
    auctionHTML();
    detailInfo.classList.remove('py-0');
    productContainer.classList.add('h-[calc(100vh-72px)]');
    bidButtons.classList.remove('h-0');
    draggableSlider(document.querySelector('#slider'));
  } else if (detailButton.attributes.src.value === 'images/hide-info.svg') {
    auctionContainer.innerHTML = '';
    detailInfo.classList.remove('py-0');
    bidButtons.classList.add('h-0');
    productContainer.classList.remove('h-[calc(100vh-72px)]');
  } else {
    detailInfo.classList.add('py-0');
  }
});

function checkMediaSize() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    auctionHTML();
    draggableSlider(document.querySelector('#slider'));
  }
}

checkMediaSize();
