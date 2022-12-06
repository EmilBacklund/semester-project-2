function displayPosts(data, container) {
  const html = container;
  console.log(data);

  function smallPost() {
    return `
    <div>
              <a href="details.html">
                <img
                  class="object-cover w-full rounded-xl h-[calc(100%-40px)]"
                  src="images/car.png"
                  alt=""
                />
              </a>
              <p>Car</p>
              <p>100 Cr</p>
            </div>
    `;
  }

  function bigPost() {
    return `
    <div class="row-span-2">
              <img
                class="object-cover w-full rounded-xl h-[calc(100%-40px)]"
                src="images/backpack.png"
                alt=""
              />
              <p>Backpack</p>
              <p>400 Cr</p>
            </div>
    `;
  }

  function fourPostsContainer() {
    return `
    <div class="grid grid-rows-3 grid-cols-2 min-w-full gap-4 max-h-[calc(100vh-206px)]">
    ${smallPost()}
    ${bigPost()}
    ${bigPost()}
    ${smallPost()}
    </div>
    `;
  }

  for (let i = 0; i < data.length; i += 1) {
    if (i % 4 === 0) {
      html.innerHTML += fourPostsContainer();
    }
  }
}

export default displayPosts;
