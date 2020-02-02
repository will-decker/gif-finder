const searchBox = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');
const gifContainer = document.getElementById('gif-grid');
const trending = document.getElementById('trending');

const apiKey = 'wgMoDU1mKp8t8xdPjuRvigmzMXxnKSyM';
let searchTerm = '';
const giphyAPI = 'http://api.giphy.com/v1/gifs/';
const searchEndPoint = `${giphyAPI}search?`;
const trendingEndPoint = `${giphyAPI}trending?`;
let searchUrl = searchEndPoint + 'api_key=' + apiKey + '&limit=40&q=';
let trendingUrl = trendingEndPoint + 'api_key=' + apiKey + '&limit=40';

init();

searchBtn.addEventListener('click', findGIFs);
trending.addEventListener('click', trendingBtn);

function addGIFToDOM(imgSrc) {
  const GIF = document.createElement('div');
  GIF.innerHTML = `<img src="${imgSrc}">`;
  gifContainer.appendChild(GIF);
}

function getTrendingGIFs() {
  getGIFs(trendingUrl);
}

function trendingBtn() {
  clearDOM();
  getTrendingGIFs();
}

function findGIFs() {
  searchTerm = searchBox.value;
  console.log(searchTerm);
  clearDOM();
  getGIFs(searchUrl + searchTerm);
  // clearSearch();
}

function getGIFs(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function() {
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

function init() {}

function clearDOM() {
  while (gifContainer.firstChild) {
    gifContainer.removeChild(gifContainer.firstChild);
  }
}

function addGIFsToDOM(srcGIFs) {
  for (var i = 0; i < srcGIFs.data.length; i++) {
    var imgGIF = srcGIFs.data[i].images.original.url;
    addGIFToDOM(imgGIF);
  }
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    getGIFs(searchUrl + searchTerm + '&offset=41');
  }
});
