export const showLightbox = (url) => {
  document.body.classList.add('no-scroll');
  const lightbox = document.getElementById('lightbox');
  const img = document.querySelector('#lightbox img');
  const input = document.querySelector('#lightbox input');
  img.src = url;
  input.value = url;
  lightbox.classList.add('shown');
};

export const listenForLightboxClosed = () => {
  const lightbox = document.getElementById('lightbox');
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      document.body.classList.remove('no-scroll');
      lightbox.classList.remove('shown');
      document.querySelector('#lightbox img').src = '';
    }
  });
};
