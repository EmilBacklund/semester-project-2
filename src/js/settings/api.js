import { getUserFromLocalStorage } from './localStorage';

const userName = getUserFromLocalStorage().user.name;

const BASE_URL = 'https://nf-api.onrender.com/';

const REGISTER_ENDPOINT = `${BASE_URL}api/v1/auction/auth/register`;
const LOGIN_ENDPOINT = `${BASE_URL}api/v1/auction/auth/login`;
const ALLPOSTS_ENDPOINT = `${BASE_URL}api/v1/auction/listings?_seller=true&_bids=true&sort=created&sortOrder=desc`;
const SINGLEPOST_ENDPOINT = `${BASE_URL}api/v1/auction/listings/`;
const BIDONITEM_ENDPOINT = `${BASE_URL}api/v1/auction/listings/`;
const PROFILE_ENDPOINT = `${BASE_URL}api/v1/auction/profiles/${userName}`;
const CREATE_AUCTION_ENDPOINT = `${BASE_URL}api/v1/auction/listings`;

export {
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  ALLPOSTS_ENDPOINT,
  SINGLEPOST_ENDPOINT,
  BIDONITEM_ENDPOINT,
  PROFILE_ENDPOINT,
  CREATE_AUCTION_ENDPOINT,
};
