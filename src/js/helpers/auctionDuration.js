import { DateTime } from 'luxon';

const auctionEnd = document.querySelector('#auctionEnd');

const durationButtons = document.querySelectorAll('.duration-button');

for (let i = 0; i < durationButtons.length; i += 1) {
  durationButtons[i].addEventListener('click', () => {
    const h = durationButtons[i].innerHTML.trim().slice(0, -1);
    const duration = DateTime.now()
      .plus({ hours: h })
      .toLocaleString(DateTime.DATETIME_MED);

    auctionEnd.innerHTML = `<span>Ends:</span> <span class="text-amber-400">${duration}</span>`;

    const current = document.getElementsByClassName('outline');
    if (current.length > 0) {
      current[0].className = current[0].className.replace(' outline', '');
    }

    durationButtons[i].className += ' outline';
  });
}
