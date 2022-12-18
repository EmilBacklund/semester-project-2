import { CREATE_AUCTION_ENDPOINT } from './settings/api';
import { getUserFromLocalStorage } from './settings/localStorage';

const jwtToken = getUserFromLocalStorage().token;

const createAuctionForm = document.querySelector('#createAuctionForm');
const generalMessage = document.querySelector('#generalMessage');

const input = document.querySelector('#tags');
const tagContainer = document.querySelector('#tagContainer');
const tagError = document.querySelector('#tagError');

let itemTags = [];

function tagHandler() {
  const tagArray = [];

  input.addEventListener('keyup', (e) => {
    if (e.which === 13 && input.value.length > 0) {
      const tags = document.querySelectorAll('.tag');
      const text = document.createTextNode(input.value);
      const p = document.createElement('p');

      let tagExists = false;

      console.dir(tagContainer);

      for (let j = 0; j < tags.length; j += 1) {
        if (tags[j].innerHTML === input.value) {
          tagError.classList.remove('hidden');
          tagExists = true;
        }
      }

      if (!tagExists) {
        tagError.classList.add('hidden');
        tagContainer.appendChild(p);
        p.appendChild(text);
        tagArray.push(text.data);

        p.classList.add(
          'tag',
          'font-semibold',
          'px-2',
          'py-1',
          'rounded',
          'text-stone-900',
          'bg-white',
          'pointer-events-none',
          'before:pointer-events-auto',
          'before:content-["x"]',
          'before:cursor-pointer',
          'before:mr-2',
          'before:bg-neutral-500',
          'before:text-center',
          'before:text-white',
          'before:px-2',
          'before:rounded',
          'before:leading-5',
          'before:font-semibold',
          'before:hover:bg-neutral-700',
        );
        input.value = '';
      }

      const deleteTags = document.querySelectorAll('.tag');

      for (let i = 0; i < deleteTags.length; i += 1) {
        deleteTags[i].addEventListener('click', () => {
          deleteTags[i].remove();
          tagArray[i] = '';
        });
      }
      console.log(tagArray);
      itemTags = tagArray.filter((tag) => tag);
      console.log(itemTags);
    }
  });
}

tagHandler();

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
  if (response.ok) {
    window.document.location = `details.html?id=${jsonResponse.id}`;
  }

  const errorMessage = `${jsonResponse.errors[0].message}`;
  throw Error(errorMessage);
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
      tags: itemTags,
      media: imageArray,
      endsAt: itemDuration.attributes.value.nodeValue,
    };

    console.log(requestedBody);
    createAuction(requestedBody)
      .then((data) => {
        console.log('what data is this?', data);
      })
      .catch((errorMessage) => {
        generalMessage.innerHTML = `${errorMessage}`;
        generalMessage.classList.add('text-red-500');
      });
  }
});
