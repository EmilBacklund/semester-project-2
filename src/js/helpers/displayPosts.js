function displayPosts(data, container) {
  const html = container;
  console.log(data);

  function sectionHTML() {
    let containerHTML = ``;
    let counter = 0;
    let highestBid = 0;
    for (let j = 0; j < data.length; j += 1) {
      if (data[j].bids[0]) {
        highestBid = data[j].bids[0].amount;
      } else {
        highestBid = 0;
      }

      if (!data[j].media[0]) {
        data[j].media[0] = 'images/no-image.png';
      }

      counter += 1;
      if (counter === 1) {
        containerHTML += `<div class="grid grid-rows-3 grid-cols-2 min-w-full gap-4 max-h-[calc(100vh-257px)]">`;
      }
      if (counter === 1 || counter === 4) {
        containerHTML += `<div class="row-span-1 flex flex-col">
            <a href="details.html?id=${data[j].id}" class="min-h-0 mb-2 h-full ">
              <img
                class="object-cover w-full rounded-xl h-full"
                src="${data[j].media[0]}"
                alt="${data[j].title}"
              />
            </a>
            <div class="flex justify-between items-center flex-wrap">
                <div>
                    <p class="">${data[j].title}</p>
                    <p>Current bid: ${highestBid} Credits</p>
                </div>
                <div class="flex gap-2 items-center">
                    <div class="w-8 h-8"><img
                    class="object-cover h-full w-full"
                    src="${data[j].seller.avatar}"
                    alt="${data[j].seller.name}"/>
                    </div>
                    <p>${data[j].seller.name}</p>
                </div>
            </div>
          </div>`;
      } else {
        containerHTML += `<div class="row-span-2 flex flex-col">
        <a href="details.html?id=${data[j].id}" class="h-full mb-2 min-h-0">
            <img
              class="object-cover w-full rounded-xl h-full"
              src="${data[j].media[0]}"
              alt="${data[j].title}"
            />
            </a>
            <div class="flex justify-between items-center flex-wrap">
                <div>
                    <p class="">${data[j].title}</p>
                    <p>Current bid: ${highestBid} Credits</p>
                </div>
                <div class="flex gap-2 items-center">
                    <div class="w-8 h-8"><img
                    class="object-cover h-full w-full"
                    src="${data[j].seller.avatar}"
                    alt="${data[j].seller.name}"/>
                    </div>
                    <p>${data[j].seller.name}</p>
                </div>
            </div>
          </div>`;
      }
      if (counter === 4) {
        containerHTML += `</div>`;
        counter = 0;
      }
    }
    return containerHTML;
  }

  html.innerHTML = sectionHTML();
}

export default displayPosts;
