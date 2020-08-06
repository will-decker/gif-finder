const searchBox = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gifContainer = document.getElementById('gif-grid');
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

function addGIFToDOM(imgSrc) {
  const GIF = document.createElement('div');
  GIF.classList.add('gif-block');
  GIF.innerHTML = `<img src="${imgSrc}">`;
  gifContainer.appendChild(GIF);
  GIF.onclick = gifZoom;
}

function gifZoom() {
  alert('hey');
}

function addGIFsToDOM(srcGIFs) {
  for (let i = 0; i < srcGIFs.data.length; i++) {
    var imgGIF = srcGIFs.data[i].images.original.url;
    addGIFToDOM(imgGIF);
  }
}

function getTrendingGIFs() {
  clearDOM();
  getGIFs(trendingUrl);
}

function findGIFs() {
  searchTerm = searchBox.value;
  console.log(searchTerm);
  clearDOM();
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
  while (gifContainer.firstChild) {
    gifContainer.removeChild(gifContainer.firstChild);
  }
}

function init() {
  getTrendingGIFs();
}
