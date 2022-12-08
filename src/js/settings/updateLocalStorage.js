import {
  getUserFromLocalStorage,
  saveCreditsInLocalStorage,
} from './localStorage';
import { PROFILE_ENDPOINT } from './api';

const jwtToken = getUserFromLocalStorage().token;

async function updateLocalStorage() {
  const response = await fetch(PROFILE_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    console.log(data);
    saveCreditsInLocalStorage(data.credits);
  }
}

export default updateLocalStorage;
