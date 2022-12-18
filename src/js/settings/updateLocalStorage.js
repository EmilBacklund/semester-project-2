import {
  getUserFromLocalStorage,
  saveCreditsInLocalStorage,
  saveUserInLocalStorage,
} from './localStorage';
import { PROFILE_ENDPOINT } from './api';

const jwtToken = getUserFromLocalStorage().token;

async function updateLocalStorage() {
  const { pathname } = window.document.location;
  if (pathname === '/login.html') {
    return false;
  }
  if (jwtToken) {
    const response = await fetch(PROFILE_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      console.log('Helloo', data);

      const userInfo = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
      };
      saveCreditsInLocalStorage(data.credits);
      saveUserInLocalStorage(userInfo);
    }
  }
  return true;
}

export default updateLocalStorage;
