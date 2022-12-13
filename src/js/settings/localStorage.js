function clearStorage() {
  localStorage.clear();
}

function saveTokenInLocalStorage(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

function saveUserInLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function saveCreditsInLocalStorage(credits) {
  localStorage.setItem('credits', JSON.stringify(credits));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return false;
}

function getUserFromLocalStorage() {
  const user = getFromStorage('user');
  const credit = getFromStorage('credits');
  const token = getFromStorage('token');

  const userData = {
    user,
    credit,
    token,
  };

  if (userData) {
    return userData;
  }
  return [];
}

export {
  saveCreditsInLocalStorage,
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
  getUserFromLocalStorage,
  clearStorage,
};
