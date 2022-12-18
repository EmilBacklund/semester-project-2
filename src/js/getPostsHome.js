import draggableSlider from './helpers/horizontalScroll';
import { ALLPOSTS_ENDPOINT } from './settings/api';
import displayPosts from './helpers/displayPosts';

const postContainer = document.querySelector('#postContainer');
draggableSlider(postContainer);

const generalMessage = document.querySelector('#generalMessage');
let errorMessage = '';
let postData = [];

async function getAllPosts() {
  const response = await fetch(ALLPOSTS_ENDPOINT, {
    method: 'GET',
  });

  postData = await response.json();

  if (response.ok) {
    generalMessage.classList.add('hidden');
    displayPosts(postData, postContainer);
  } else if (postData.errors[0].message) {
    errorMessage = `
  <span class="text-red-500">Error:</span> 
  ${postData.errors[0].message} 
  <span class="text-red-500">Error code</span>: 
  ${postData.statusCode}`;
  } else {
    errorMessage = `
    <span class="text-red-500">Error:</span> 
    ${postData.status} 
    <span class="text-red-500">Error code</span>: 
    ${postData.statusCode}`;
  }

  generalMessage.classList.remove('hidden');
  generalMessage.innerHTML = errorMessage;
}

getAllPosts();
