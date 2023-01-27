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

  document.title = `AH | ${data.title}`;

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
    const output = {
      credit: [],
      seller: [],
    };
    let inserted;

    for (let i = 0; i < data.bids.length; i += 1) {
      inserted = false;
      for (let j = 0; j < output.credit.length; j += 1) {
        if (data.bids[i].amount > output.credit[j]) {
          inserted = true;
          output.credit.splice(j, 0, data.bids[i].amount);
          output.seller.splice(j, 0, data.bids[i].bidderName);
          break;
        }
      }
      if (!inserted) {
        output.credit.push(data.bids[i].amount);
        output.seller.push(data.bids[i].bidderName);
      }
    }

    slider.innerHTML = '';
    let counter = 0;

    for (let k = 0; k < output.credit.length; k += 1) {
      counter += 1;

      slider.innerHTML += `<div class="flex-none relative">
      <img
        src="images/ticket.svg"
        alt="ticket ${counter}"
      />
      <div class="flex gap-4 absolute inset-1/2 -translate-x-1/4 w-full -translate-y-1/4  items-center">
      <div class="w-8 h-8 shrink-0 bg-green-700 rounded-xl text-xl font-semibold text-center leading-8">${counter}</div>
      <div>
      <p class="text-neutral-500">${output.seller[k]}</p>
      <p class="text-xl text-black font-normal">${output.credit[k]} CR</p>
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
