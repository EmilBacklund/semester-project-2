function signupInnerHTML(container, introtext) {
  const content = container;
  const intro = introtext;

  content.innerHTML = `<div class="w-full flex flex-col">
    <label for="signupName">Name:</label>
    <input
      class="p-2 rounded text-black"
      type="text"
      placeholder="Name.."
      name="signupName"
    />
  </div>
  <div class="w-full flex flex-col">
    <label for="signupEmail">Email:</label>
    <input
      class="p-2 rounded text-black"
      type="email"
      placeholder="Email.."
      name="signupEmail"
    />
  </div>
  <div class="w-full flex flex-col">
    <label for="signupPassword">Password:</label>
    <input
      class="p-2 rounded text-black"
      type="password"
      placeholder="Password.."
      name="signupPassword"
    />
  </div>
  <div class="flex gap-2 items-center">
    <p>Profile Image:</p>
    <img
      id="chooseImage"
      class="cursor-pointer h-8 w-8 object-cover"
      src="images/add-image.svg"
      alt="choose image"
    />
  </div>
  <div id="imageURLContainer" class="hidden">
    <p>Image URL:</p>
    <p id="imageURL" class="break-words"></p>
  </div>
  <button
    class="bg-green-500 px-8 w-fit text-xl font-semibold py-2 rounded font-signika"
  >
    Submit
  </button>`;

  intro.innerHTML = `
  <h1 class="font-syne text-4xl">
  <span class="text-red-500">A</span>uction
  <span class="text-red-500">H</span>ouse
</h1>
<p class="text-xl">Sign up and get:</p>
<div class="flex justify-center">
  <div
    class="flex items-center gap-2 text-xl px-5 py-3 bg-zinc-800 rounded-xl shadow-[inset_0_0_6px_rgba(255,255,255,0.25)]"
  >
    <img src="images/coin.svg" alt="coin" />
    <p class="font-poppins font-semibold cursor-default">
      <span class="text-amber-400">1000</span> CR
    </p>
  </div>
</div>
  `;
}

function loginInnerHTML(container, introtext) {
  const content = container;
  const intro = introtext;

  content.innerHTML = `<div class="w-full flex flex-col">
      <label for="loginName">Name:</label>
      <input
        id="loginName"
        class="p-2 rounded text-black"
        type="text"
        placeholder="Name.."
        name="loginName"
      />
    </div>
    <div class="w-full flex flex-col">
      <label for="loginEmail">Email:</label>
      <input
        class="p-2 rounded text-black"
        type="email"
        placeholder="Email.."
        name="loginEmail"
      />
    </div>
    <div class="w-full flex flex-col">
      <label for="loginPassword">Password:</label>
      <input
        class="p-2 rounded text-black"
        type="password"
        placeholder="Password.."
        name="loginPassword"
      />
    </div>
    <button
      class="bg-green-500 px-8 w-fit text-xl font-semibold py-2 rounded font-signika"
    >
      Log In
    </button>`;

  intro.innerHTML = `
  <h1 class="font-syne text-4xl">
  <span class="text-red-500">A</span>uction
  <span class="text-red-500">H</span>ouse
</h1>
<p class="text-xl">Welcome</p>
<div class="flex justify-center">
  <div
    class="flex items-center h-12 gap-2 text-xl px-5 py-3 bg-zinc-800 rounded-xl shadow-[inset_0_0_6px_rgba(255,255,255,0.25)]"
  >
    <p id="loginUserName" class="font-poppins font-semibold cursor-default"></p>
  </div>
</div>
  `;
}

export { loginInnerHTML, signupInnerHTML };
