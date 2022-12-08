import { BIDONITEM_ENDPOINT, SINGLEPOST_ENDPOINT } from './settings/api';
import { getUserFromLocalStorage } from './settings/localStorage';
import { postID } from './singleDetailPost';
import dynamicHeader from './helpers/dynamicHeader';
import updateLocalStorage from './settings/updateLocalStorage';

const jwtToken = getUserFromLocalStorage().token;
const userName = getUserFromLocalStorage().user.name;
const bidMessage = document.querySelector('#bidMessage');
const bidMessageContainer = document.querySelector('#bidMessageContainer');

const creditBtn50 = document.querySelector('#creditBtn50');
const creditBtn100 = document.querySelector('#creditBtn100');
const amount50 = {
  amount: +creditBtn50.value,
};
const amount100 = {
  amount: +creditBtn100.value,
};

async function bidOnItem(credit) {
  const response = await fetch(`${BIDONITEM_ENDPOINT}${postID}/bids`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(credit),
  });

  const data = await response.json();
  console.log(data);
  if (response.ok) {
    console.log(response);
    bidMessageContainer.classList.add('flex');
    bidMessageContainer.classList.remove('hidden');
    bidMessage.innerHTML = `Successful bid 🙂`;
    return data;
  }
  if (data.errors[0].message) {
    bidMessageContainer.classList.add('flex');
    bidMessageContainer.classList.remove('hidden');
    bidMessage.innerHTML = `${data.errors[0].message}`;
  }
  return false;
}

async function getItemData() {
  const response = await fetch(
    `${SINGLEPOST_ENDPOINT}${postID}?_seller=true&_bids=true`,
    {
      method: 'GET',
    },
  );

  const data = await response.json();
  console.log(data);

  return data;
}

creditBtn50.addEventListener('click', () => {
  getItemData().then((data) => {
    console.log(data);
    console.log(data.bids.length);
    if (data.bids.length) {
      const result = data.bids[data.bids.length - 1].bidderName;

      if (result === userName) {
        console.log('kan inte');
        bidMessageContainer.classList.add('flex');
        bidMessageContainer.classList.remove('hidden');
        bidMessage.innerHTML = `You already have the highest bid`;
      } else {
        bidOnItem(amount50);
        updateLocalStorage().then(() => {
          dynamicHeader();
        });
      }
    } else {
      bidOnItem(amount50);
      updateLocalStorage().then(() => {
        dynamicHeader();
      });
    }
  });
});

creditBtn100.addEventListener('click', () => {
  getItemData().then((data) => {
    console.log(data);
    console.log(data.bids.length);
    if (data.bids.length) {
      const result = data.bids[data.bids.length - 1].bidderName;
      if (result === userName) {
        bidMessageContainer.classList.add('flex');
        bidMessageContainer.classList.remove('hidden');
        bidMessage.innerHTML = `You already have the highest bid`;
      } else {
        bidOnItem(amount100);
        updateLocalStorage().then(() => {
          dynamicHeader();
        });
      }
    } else {
      bidOnItem(amount100);
      updateLocalStorage().then(() => {
        dynamicHeader();
      });
    }
  });
});
