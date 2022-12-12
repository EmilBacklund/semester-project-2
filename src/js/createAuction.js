import { CREATE_AUCTION_ENDPOINT } from './settings/api';
import { getUserFromLocalStorage } from './settings/localStorage';
import tagHandler from './helpers/tagHandler';

const jwtToken = getUserFromLocalStorage().token;

const createAuctionForm = document.querySelector('#createAuctionForm');

async function createAuction(data) {
  const response = await fetch(`${CREATE_AUCTION_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(data),
  });

  console.log('inside async function', JSON.stringify(data));

  const jsonResponse = await response.json();

  console.log(jsonResponse);
  //   if (response.ok) {
  //     const bodyData
  //   }
}

const itemTitle = document.querySelector('#itemTitle');
const titleError = document.querySelector('#titleError');
const itemDescription = document.querySelector('#itemDescription');
const descriptionError = document.querySelector('#descriptionError');
const imageError = document.querySelector('#imageError');
const itemDurationError = document.querySelector('#itemDurationError');

createAuctionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let itemTitleIsValid = false;

  console.log(tagHandler());

  const imageArray = [];
  const itemDuration = document.querySelector('#itemDuration');

  if (itemTitle.value.trim().length) {
    itemTitleIsValid = true;
    titleError.classList.add('hidden');
  } else {
    itemTitleIsValid = false;
    titleError.classList.remove('hidden');
  }

  let itemDescriptionIsValid = false;

  if (itemDescription.value.trim().length) {
    itemDescriptionIsValid = true;
    descriptionError.classList.add('hidden');
  } else {
    itemDescriptionIsValid = false;
    descriptionError.classList.remove('hidden');
  }

  const itemImage = document.querySelectorAll('.item-image');
  let itemImageIsValid = false;

  for (let i = 0; i < itemImage.length; i += 1) {
    if (itemImage[i].attributes.src.nodeValue) {
      imageArray.push(itemImage[i].attributes.src.nodeValue);
    }
  }

  if (imageArray.length) {
    itemImageIsValid = true;
    imageError.classList.add('hidden');
  } else {
    itemImageIsValid = false;
    imageError.classList.remove('hidden');
  }

  let itemDurationIsValid = false;

  if (itemDuration) {
    itemDurationError.classList.add('hidden');
    itemDurationIsValid = true;
  } else {
    itemDurationError.classList.remove('hidden');
    itemDurationIsValid = false;
  }

  if (
    itemTitleIsValid &&
    itemDescriptionIsValid &&
    itemImageIsValid &&
    itemDurationIsValid
  ) {
    console.dir(itemDuration.attributes.value.nodeValue);

    const requestedBody = {
      title: itemTitle.value,
      description: itemDescription.value,
      tags: tagHandler(),
      media: imageArray,
      endsAt: itemDuration.attributes.value.nodeValue,
    };

    console.log(requestedBody);
    createAuction(requestedBody);
  }
});
