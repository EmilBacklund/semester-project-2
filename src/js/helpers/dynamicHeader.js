import { getUserFromLocalStorage } from '../settings/localStorage';

function dynamicHeader() {
  const header = document.querySelector('#header');
  const userData = getUserFromLocalStorage();
  let { pathname } = window.document.location;

  console.log(userData);

  if (
    (pathname === '/profile.html' && !userData.token) ||
    (pathname === '/auctioning.html' && !userData.token)
  ) {
    console.log(pathname);
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
    header.innerHTML = ` <a href="index.html"><img src="images/arrow-back.svg" alt="" /></a>
    <div class="flex gap-4 items-center">
    ${credit()}
        <div class="w-8 h-8 cursor-pointer odd:hover:opacity-0 even:hover:opacity-100 relative"
          ><div id="noFav" class="absolute h-full w-full bg-no-repeat bg-center bg-[url('images/bx-heart.svg')] "></div>
          <div id="fav" class="absolute h-full w-full bg-no-repeat bg-center transition-all hover:scale-125 duration-300 opacity-0 hover:opacity-100 hover:bg-[url('images/bxs-heart.svg')]">
          </div>
    </div>`;

    const fav = document.querySelector('#fav');
    const noFav = document.querySelector('#noFav');
    fav.addEventListener('mouseover', () => {
      noFav.classList.add('hidden');
      noFav.classList.add('opacity-0');
    });
    fav.addEventListener('mousedown', () => {
      fav.classList.remove('hover:scale-125');
      fav.classList.remove('scale-125');
      fav.classList.add('scale-105');
    });

    fav.addEventListener('mouseup', () => {
      fav.classList.toggle('scale-125');
      fav.classList.toggle('opacity-100');
      fav.classList.toggle('hover:opacity-100');
      fav.classList.toggle('opacity-0');
      fav.classList.toggle("bg-[url('images/bxs-heart.svg')]");
      fav.classList.remove('scale-105');
    });

    fav.addEventListener('mouseleave', () => {
      noFav.classList.add('opacity-100');
      noFav.classList.remove('hidden');
      fav.classList.add('hover:scale-125');
    });
  }
}

export default dynamicHeader;
