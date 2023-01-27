import { getUserFromLocalStorage } from '../settings/localStorage';

function dynamicHeader() {
  const header = document.querySelector('#header');
  const userData = getUserFromLocalStorage();
  let { pathname } = window.document.location;

  if (
    (pathname === '/profile.html' && !userData.token) ||
    (pathname === '/auctioning.html' && !userData.token)
  ) {
    window.document.location = '/login.html';
  }

  if (!pathname || pathname === '/') {
    pathname = '/index.html';
  }

  function credit() {
    if (userData.credit) {
      return `
    <div class="flex items-center gap-2 text-base md:text-xl  px-2 py-1 bg-zinc-800 rounded-xl shadow-[inset_0_0_6px_rgba(255,255,255,0.25)]">
    <img src="images/coin.svg" alt="coin" />
         <p class="font-poppins font-semibold cursor-default">
            <span class="text-amber-400">${userData.credit}</span> CR
         </p>
    </div>
        `;
    }
    return ``;
  }
  function avatar() {
    if (userData.user.avatar) {
      return `
        <a class="w-8 h-8" href="profile.html"
        ><img class="object-contain" src="${userData.user.avatar}" alt="username ${userData.user.name}" /></a>
        `;
    }
    return `
    <a class="w-8 h-8" href="login.html"
        ><img class="object-contain" src="images/not-logged-in.svg" alt="log in" /></a>
    `;
  }

  if (header) {
    header.innerHTML = `<div class="flex items-center gap-4">
    <a href="/index.html"
      ><i class="font-syne not-italic text-4xl ${
        pathname === '/index.html' ? 'text-red-500' : ''
      }">AH</i></a
    >
    <a href="/favorites.html"
      ><span><img src="${
        pathname === '/favorites.html'
          ? 'images/bxs-heart.svg'
          : 'images/bx-heart.svg'
      }" alt="favorite" /></span
    ></a>
  </div>
  <div class="flex items-center gap-4">
    ${credit()}
    ${avatar()}
  </div>`;
  }

  if (header && pathname === '/details.html') {
    header.innerHTML = ` <a href="index.html"><img src="images/arrow-back.svg" alt="previous page" /></a>
    <div class="flex gap-4 items-center">
    ${credit()}
        <div class=" cursor-pointer odd:hover:opacity-0 even:hover:opacity-100 relative"
          ><img class="object-cover" src="images/bx-heart.svg" alt="add to favorite" />
          </div>
    </div>`;
  }
}

export default dynamicHeader;
