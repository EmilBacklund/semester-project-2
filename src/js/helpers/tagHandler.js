const input = document.querySelector('#tags');
const tagContainer = document.querySelector('#tagContainer');

input.addEventListener('keyup', (e) => {
  if (e.which === 13 && input.value.length > 0) {
    const text = document.createTextNode(input.value);
    const p = document.createElement('p');
    tagContainer.appendChild(p);
    p.appendChild(text);
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

    const deleteTags = document.querySelectorAll('.tag');

    for (let i = 0; i < deleteTags.length; i += 1) {
      deleteTags[i].addEventListener('click', () => {
        tagContainer.removeChild(deleteTags[i]);
      });
    }
  }
});
