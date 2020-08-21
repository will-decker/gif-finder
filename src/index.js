const searchBox = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gifGrid = document.querySelector('#gif-grid');
const gifBlock = document.getElementsByClassName('gif-block');
const trending = document.getElementById('trending');

const apiKey = 'api_key=wgMoDU1mKp8t8xdPjuRvigmzMXxnKSyM';
let searchTerm = '';
const limit = 30;
let paginate = 0;
const giphyAPI = 'http://api.giphy.com/v1/gifs/';
const searchEndPoint = `${giphyAPI}search?`;
const trendingEndPoint = `${giphyAPI}trending?`;
let searchUrl = `${searchEndPoint}${apiKey}&limit=${limit}&q=`;
let trendingUrl = `${trendingEndPoint}${apiKey}&limit=${limit}`;

init();

searchBtn.addEventListener('click', findGIFs);
searchBox.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    findGIFs();
  }
});

trending.addEventListener('click', getTrendingGIFs);

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    paginate += limit;
    if (searchTerm != '') {
      getGIFs(`${searchUrl}${searchTerm}&offset=${paginate}`);
    } else {
      getGIFs(`${trendingUrl}&offset=${paginate}`);
    }
  }
});

function addGIFToDOM(imgSrc, gifTitle) {
  const GIF = document.createElement('div');
  GIF.classList.add('gif-block');
  GIF.innerHTML = `
  <img src="${imgSrc}">
  <div class="gif-title">${gifTitle}</div>`;
  gifGrid.appendChild(GIF);
  GIF.onclick = gifZoom;
}

function gifZoom() {
  alert('hey');
}

function addGIFsToDOM(srcGIFs) {
  for (let i = 0; i < srcGIFs.data.length; i++) {
    let imgGIF = srcGIFs.data[i].images.original.url;
    let titleGIF = srcGIFs.data[i].title;
    addGIFToDOM(imgGIF, titleGIF);
  }
}

function getTrendingGIFs() {
  searchTerm = '';
  clearDOM();
  gifGrid.classList.add('images-unloaded');
  getGIFs(trendingUrl);
}

function findGIFs() {
  searchTerm = searchBox.value;
  console.log(searchTerm);
  clearDOM();
  gifGrid.classList.add('images-unloaded');
  getGIFs(searchUrl + searchTerm);
  clearSearch();
}

function getGIFs(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const dataGIFs = JSON.parse(this.responseText);

      addGIFsToDOM(dataGIFs);
    }
  };
  xhr.send();
}

function clearSearch() {
  searchInput.value = '';
}

function clearDOM() {
  while (gifGrid.firstChild) {
    gifGrid.removeChild(gifGrid.firstChild);
  }
}

function init() {
  getTrendingGIFs();
}
