var searchBox = document.getElementById('searchInput');
var searchBtn = document.getElementById('searchBtn');
var searchForm = document.getElementById('searchForm');
var apiKey = 'dc6zaTOxFJmzC';
var searchTerm = '';
const giphyAPI = 'http://api.giphy.com/v1/gifs/';
var searchEndPoint = `${giphyAPI}search?`;
var trendingEndPoint = 'http://api.giphy.com/v1/gifs/trending?';
var searchUrl = searchEndPoint + 'api_key=' + apiKey + '&limit=25&q=';
var trendingUrl = trendingEndPoint + 'api_key=' + apiKey;

init();

function getTrendingGifs() {
  gifRequest(trendingUrl);
}

searchBtn.addEventListener('click', findGifs);

function findGifs() {
  searchTerm = searchBox.value;
  console.log(searchTerm);
  gifRequest(searchUrl + searchTerm);
}

function gifRequest(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if (this.status == 200) {
      var gifs = JSON.parse(this.responseText);
      var output = '';

      console.log(gifs.data.length);

      for (var i = 0; i < gifs.data.length; i++) {
        console.log(gifs.data[i]);
        var gifImage = gifs.data[i].images.original.url;
        output += '<img src="' + gifImage + '">';
      }
    }
    document.getElementById('gif_grid').innerHTML = output;
  };
  xhr.send();
}

// function clearSearch() {
//   searchForm.reset();
//   searchTerm = '';
// }

function init() {
  getTrendingGifs();
  // clearSearch();
}
