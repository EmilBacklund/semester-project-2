import '../css/style.css';
import dynamicHeader from './helpers/dynamicHeader';
import { getUserFromLocalStorage } from './settings/localStorage';
import updateLocalStorage from './settings/updateLocalStorage';

updateLocalStorage().then(() => {
  dynamicHeader();
});
