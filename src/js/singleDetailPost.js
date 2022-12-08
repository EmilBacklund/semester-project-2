import { DateTime } from 'luxon';
import { SINGLEPOST_ENDPOINT } from './settings/api';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postID = searchParam.get('id');

export { postID };

async function postDetail() {
  const response = await fetch(
    `${SINGLEPOST_ENDPOINT}${postID}?_seller=true&_bids=true`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  console.log(data);
  const { endsAt } = data;
  const now = DateTime.now();
  const timeBetween = DateTime.fromISO(endsAt)
    .diff(now, ['days', 'hours', 'minutes', 'seconds'])
    .toObject();
  let { days } = timeBetween;
  let { hours } = timeBetween;
  let { minutes } = timeBetween;
  let seconds = Math.round(timeBetween.seconds);

  days = `${days ? `${days} days` : ''}`;
  hours = `${hours ? `${hours} hours` : ''}`;
  minutes = `${minutes ? `${minutes} minutes` : ''}`;
  seconds = `${seconds ? `${seconds} seconds` : ''}`;

  const itemDuration = document.querySelector('#itemDuration');

  itemDuration.innerHTML = `<span class="font-semibold">Time left:</span>
  ${days} ${hours} ${minutes} ${seconds}`;

  const itemImage = document.querySelector('#itemImage');
  if (data.media[0]) {
    itemImage.src = `${data.media[0]}`;
  } else {
    itemImage.src = `images/no-image.png`;
  }

  const itemTitle = document.querySelector('#itemTitle');
  itemTitle.innerHTML = `${data.title}`;

  const itemSeller = document.querySelector('#itemSeller');
  itemSeller.innerHTML = `${data.seller.name}`;

  const itemDescription = document.querySelector('#itemDescription');
  if (data.description) {
    itemDescription.innerHTML = `${data.description}`;
  }

  const itemTagContainer = document.querySelector('#itemTagContainer');
  const itemTags = document.querySelector('#itemTags');
  itemTags.innerHTML = ``;
  for (let i = 0; i < data.tags.length; i += 1) {
    if (data.tags.length === 1) {
      itemTags.innerHTML += `${data.tags[i]}`;
    } else if (data.tags.length > 1 && data.tags.length === i) {
      itemTags.innerHTML += `${data.tags[i]}`;
    } else {
      itemTags.innerHTML += `${data.tags[i]}, `;
    }
  }
  if (data.tags[0] === '') {
    itemTagContainer.classList.add('hidden');
  }

  const slider = document.querySelector('#slider');
  const itemSliderTitle = document.querySelector('#itemSliderTitle');
  if (itemSliderTitle) {
    itemSliderTitle.innerHTML = `${data.title}`;
  }

  if (slider) {
    slider.innerHTML = '';
    let counter = 0;
    for (let i = data.bids.length - 1; i >= 0; i -= 1) {
      counter += 1;
      slider.innerHTML += `<div class="flex-none relative">
    <img
      src="images/ticket.svg"
      alt=""
    />
    <div class="flex gap-4 absolute inset-1/2 -translate-x-1/4 w-full -translate-y-1/4  items-center">
    <div class="w-8 h-8 shrink-0 bg-green-700 rounded-xl text-xl font-semibold text-center leading-8">${counter}</div>
    <div>
    <p class="text-neutral-500">${data.bids[i].bidderName}</p>
    <p class="text-xl text-black font-normal">${data.bids[i].amount} CR</p>
    </div>
    </div>
</div>`;
    }

    if (!data.bids.length) {
      slider.innerHTML = `<div>
        <p class="text-lg text-amber-400">There's no bids at the moment</p>
    </div>`;
    }
  }
}

export default postDetail;
