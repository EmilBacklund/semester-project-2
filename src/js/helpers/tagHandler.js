const input = document.querySelector('#tags');
const tagContainer = document.querySelector('#tagContainer');
const tagError = document.querySelector('#tagError');

function tagHandler() {
  const tagArray = [];
  input.addEventListener('keyup', (e) => {
    if (e.which === 13 && input.value.length > 0) {
      const tags = document.querySelectorAll('.tag');
      const text = document.createTextNode(input.value);
      const p = document.createElement('p');

      let tagExists = false;

      console.dir(tagContainer);

      for (let j = 0; j < tags.length; j += 1) {
        if (tags[j].innerHTML === input.value) {
          tagError.classList.remove('hidden');
          tagExists = true;
        }
      }

      if (!tagExists) {
        tagError.classList.add('hidden');
        tagContainer.appendChild(p);
        p.appendChild(text);
        tagArray.push(text.data);
        console.log(tagArray);

        p.classList.add(
          'tag',
          'font-semibold',
          'px-2',
          'py-1',
          'rounded',
          'text-stone-900',
          'bg-white',
          'pointer-events-none',
          'before:pointer-events-auto',
          'before:content-["x"]',
          'before:cursor-pointer',
          'before:mr-2',
          'before:bg-neutral-500',
          'before:text-center',
          'before:text-white',
          'before:px-2',
          'before:rounded',
          'before:leading-5',
          'before:font-semibold',
          'before:hover:bg-neutral-700',
        );
        input.value = '';
      }

      const deleteTags = document.querySelectorAll('.tag');

      for (let i = 0; i < deleteTags.length; i += 1) {
        deleteTags[i].addEventListener('click', () => {
          deleteTags[i].remove();
          tagArray[i] = '';

          const result = tagArray.filter((tag) => tag);
          console.log(result);
          return result;
        });
      }
    }
  });
}

export default tagHandler;

tagHandler();
