function signupInnerHTML(container, introtext) {
  const content = container;
  const intro = introtext;

  content.innerHTML = `
  <div id="generalMessage" class="text-center text-xl"></div>
  <div class="w-full flex flex-col">
    <label for="signupName">Name:</label>
    <input
      id=name
      class="p-2 rounded text-black signup-field"
      type="text"
      placeholder="Name.."
      name="signupName"
    />
      <p id="errorName" class="text-red-500 hidden">Name must not contain punctuation symbols apart from underscore (_)</p>
      <p class="empty-field text-amber-400">Name is required</p>
  </div>
  <div class="w-full flex flex-col">
    <label for="signupEmail">Email:</label>
    <input
      id="email"
      class="p-2 rounded text-black signup-field"
      type="email"
      placeholder="Email.."
      name="signupEmail"
    />
      <p id="errorEmail" class="text-red-500 hidden">Email must be a valid stud.noroff.no or noroff.no email address</p>
      <p class="empty-field text-amber-400">Email is required</p>
  </div>
  <div class="w-full flex flex-col">
    <label for="signupPassword">Password:</label>
    <input
      id="password"
      class="p-2 rounded text-black signup-field"
      type="password"
      placeholder="Password.."
      name="signupPassword"
    />
      <p id="errorPassword" class="text-red-500 hidden">Password must be at least 8 characters</p>
      <p class="empty-field text-amber-400">Password is required</p>
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
  <p id="errorImage" class="text-red-500 hidden -mt-2">Please choose an image/ avatar</p>
  <div id="imageURLContainer" class="hidden">
    <p id="imageURL" class="break-words"></p>
  </div>

  <button
  id="submit"
    class="bg-green-500 px-8 w-fit text-xl font-semibold py-2 rounded font-signika mt-2"
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
        id="loginEmail"
        class="p-2 rounded text-black"
        type="email"
        placeholder="Email.."
        name="loginEmail"
      />
    </div>
    <div class="w-full flex flex-col mb-2">
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
    <p id="loginUserName" class="font-poppins font-semibold cursor-default">🙂</p>
  </div>
</div>
  `;

  console.log('bajs');

  const loginName = document.querySelector('#loginName');
  const loginUserName = document.querySelector('#loginUserName');
  loginName.addEventListener('keyup', () => {
    loginUserName.innerHTML = `${loginName.value} 😃`;
    if (!loginName.value) {
      loginUserName.innerHTML = '🙂';
    }
    if (loginName.value.toLowerCase().includes('hesh')) {
      loginUserName.innerHTML = `${loginName.value} 😎`;
    }
  });
}

export { loginInnerHTML, signupInnerHTML };
