import draggableSlider from './helpers/horizontalScroll';
import { ALLPOSTS_ENDPOINT } from './settings/api';
import displayPosts from './helpers/displayPosts';

const postContainer = document.querySelector('#postContainer');
draggableSlider(postContainer);

let postData = [];

async function getAllPosts() {
  const response = await fetch(ALLPOSTS_ENDPOINT, {
    method: 'GET',
  });

  console.log(response);
  if (response.ok) {
    postData = await response.json();
    displayPosts(postData, postContainer);
    // console.log(postData);
  }
}

getAllPosts();
