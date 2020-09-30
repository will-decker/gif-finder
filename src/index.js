import Macy from 'macy';

const header = document.querySelector('header');
const footer = document.querySelector('footer');
const searchBox = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gifGrid = document.querySelector('#gif-grid');
const gifBlocks = document.getElementsByClassName('gif-block');
const trending = document.getElementById('trending');
const loading = document.querySelector('.loading');
const title = document.querySelector('.title');

let searchTerm = '';
let limit = 30;
let paginate = 0;
let searchUrl = 'https://giphy-api-proxy.vercel.app/api/v1/giphy-search/?q=';
let searchParams;
let trendingUrl = 'https://giphy-api-proxy.vercel.app/api/v1/giphy-trending/?';

var macy = Macy({
  container: '#gif-grid',
  trueOrder: false,
  waitForImages: true,
  margin: 12,
  columns: 4,
  breakAt: {
    940: 3,
    520: 2,
    400: 1,
  },
});

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
    searchParams = `${searchUrl}${searchTerm}&limit=${limit}&offset=${paginate}`;
    if (searchTerm != '') {
      getGIFs(searchParams);
    } else {
      getGIFs(`${trendingUrl}limit=${limit}&offset=${paginate}`);
    }
  }

  if (scrollTop == 0) {
    header.classList.remove('solid-header-bg');
  } else {
    header.classList.add('solid-header-bg');
  }
});

function addGIFToDOM(imgSrc, gifTitle) {
  const GIF = document.createElement('div');
  GIF.classList.add('gif-block');
  GIF.classList.add('hide');
  GIF.innerHTML = `
  <img src="${imgSrc}">
  <div class="gif-title">${gifTitle}</div>`;
  gifGrid.appendChild(GIF);
  GIF.onclick = gifZoom;
}

function addGIFsToDOM(srcGIFs) {
  for (let i = 0; i < srcGIFs.data.length; i++) {
    let imgGIF = srcGIFs.data[i].images.downsized.url;
    let titleGIF = srcGIFs.data[i].title;
    addGIFToDOM(imgGIF, titleGIF);
  }

  macy.runOnImageLoad(function () {
    gifsReveal();
    loading.style.display = 'none';
    macy.recalculate(true, true);
  });

  loading.style.display = '';
}

function getTrendingGIFs() {
  searchTerm = '';
  clearDOM();
  title.textContent = 'Trending';
  getGIFs(`${trendingUrl}limit=${limit}`);
  macy.reInit();
}

function findGIFs() {
  searchTerm = searchBox.value;
  clearDOM();
  title.textContent = `Search results for "${searchTerm}"`;
  searchParams = `${searchUrl}${searchTerm}&limit=${limit}&offset=${paginate}`;
  getGIFs(searchParams);
  macy.reInit();
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

function gifZoom() {
  alert('hey');
}

function gifsReveal() {
  for (var i = 0; i < gifBlocks.length; i++) {
    gifBlocks[i].classList.remove('hide');
  }
}

function clearSearch() {
  searchInput.value = '';
}

function clearDOM() {
  while (gifGrid.firstChild) {
    gifGrid.removeChild(gifGrid.firstChild);
  }
}

function getBrowserWidth() {
  const { clientWidth } = document.documentElement;

  if (clientWidth > 2000) {
    limit = 50;
    return;
  }

  footer.style.width = `${clientWidth}px`;
}

function init() {
  getBrowserWidth();
  getTrendingGIFs();
}
