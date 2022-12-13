import dynamicHeader from './helpers/dynamicHeader';
import { clearStorage } from './settings/localStorage';

const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', () => {
  clearStorage();
  dynamicHeader();
});
