import '../css/style.css';
import dynamicHeader from './helpers/dynamicHeader';
import updateLocalStorage from './settings/updateLocalStorage';

updateLocalStorage().then(() => {
  dynamicHeader();
});
