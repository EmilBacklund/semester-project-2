import dynamicHeader from './helpers/dynamicHeader';
import { PROFILE_ENDPOINT, EDIT_AVATAR_ENDPOINT } from './settings/api';
import { getUserFromLocalStorage, clearStorage } from './settings/localStorage';
import updateLocalStorage from './settings/updateLocalStorage';

const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', () => {
  clearStorage();
  dynamicHeader();
});

const jwtToken = getUserFromLocalStorage().token;
const profileContainer = document.querySelector('#profileContainer');

function earnings(data) {
  let html = 0;
  if (data.credits < 1000) {
    html = `-${1000 - data.credits}`;
  } else if (data.credits === 0 || data.credits === 1000) {
    html = `${data.credits}`;
  } else {
    html = `+${data.credits - 1000}`;
  }
  return html;
}

async function getUserInfo() {
  const response = await fetch(`${PROFILE_ENDPOINT}?_listings=true`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();

    profileContainer.innerHTML = ` <div class="flex gap-5">
    <div class="rounded-xl overflow-hidden flex-1 relative">
      <img
        class="object-cover h-full rounded-xl"
        src="${data.avatar}"
        alt="${data.name}"
      />
      <button
      id="editAvatarBtn"
        class="absolute bottom-0 right-0 h-10 w-10 bg-neutral-500 rounded-lg opacity-70 hover:scale-110 transition-all duration-200 hover:opacity-50"
      >
        <div class="relative">
          <div
            class="absolute w-5 h-0.5 bg-stone-900 inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          ></div>
          <div
            class="absolute h-5 w-0.5 bg-stone-900 inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          ></div>
        </div>
      </button>
    </div>
    <div class="flex-1 flex flex-col gap-2 font-normal">
      <h1 class="text-base text-neutral-500 font-signika md:text-xl">
      ${data.name}
      </h1>
      <div class="md:text-base">
        <p>Sold items: <span class="text-neutral-500">${
          data.listings.length
        }</span></p>
        <p>Won items: <span class="text-neutral-500">${
          data.wins.length
        }</span></p>
        
        <p>Earnings: <span class="text-neutral-500">${earnings(data)}</span></p>
      </div>
    </div>
  </div>
  <p id="avatarRequestError" class="text-red-500"></p>
  <p class="text-base text-neutral-500 mb-4 md:text-xl">
    ${data.email}
  </p>
  <form id="editAvatarContainer" class="absolute hidden w-full sm:w-fit rounded shadow-md bg-white p-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  <label for="avatarInput" class="text-base font-semibold text-black">Paste in image URL to your avatar:</label
>
<input
  id="avatarInput"
  class="p-2 rounded border border-black font-poppins w-full mb-2 text-black"
  type="text"
  placeholder="Paste image URL & submit.."
  name="avatar"
/>
<p id="avatarError" class="text-red-500 mb-2 hidden">Value can't be empty</p>
<button class="items-center font-signika shadow-md bg-green-600 rounded-lg px-8 py-2 flex-grow-0 text-base md:text-xl font-semibold md:font-normal flex gap-2 hover:bg-green-700 transition-all duration-200">Submit</button>
  </form>
  `;
  }
}

function editAvatar(value) {
  async function edit() {
    const response = await fetch(`${EDIT_AVATAR_ENDPOINT}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(value),
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
      const errorMessage = jsonResponse.errors[0].message;
      alert(`${errorMessage}`);
    }
  }

  const editAvatarBtn = document.querySelector('#editAvatarBtn');
  const editAvatarContainer = document.querySelector('#editAvatarContainer');
  const avatarInput = document.querySelector('#avatarInput');
  const avatarError = document.querySelector('#avatarError');

  editAvatarBtn.addEventListener('click', () => {
    editAvatarContainer.classList.toggle('hidden');
    avatarError.classList.add('hidden');
    avatarInput.value = '';
  });

  editAvatarContainer.addEventListener('submit', (e) => {
    e.preventDefault();

    const avatarData = {
      avatar: avatarInput.value,
    };

    if (avatarInput.value) {
      editAvatar(avatarData);
    } else {
      avatarError.classList.remove('hidden');
    }
  });

  if (avatarInput.value) {
    edit()
      .then(() => {
        getUserInfo().then(() => editAvatar());
      })
      .then(() => {
        updateLocalStorage().then(() => {
          dynamicHeader();
        });
      });
  }
}

getUserInfo().then(() => {
  editAvatar();
});
