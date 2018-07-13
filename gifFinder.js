var searchBox = document.getElementById("searchInput");
var submitBtn = document.getElementById("submitBtn");
var apiKey = "dc6zaTOxFJmzC";
var searchEndPoint = "http://api.giphy.com/v1/gifs/search?";
var trendingEndPoint = "http://api.giphy.com/v1/gifs/trending?";
var searchUrl = searchEndPoint + "api_key=" + apiKey;
var trendingUrl = trendingEndPoint + "api_key=" + apiKey;

window.onload = getTrendingGifs;

function getTrendingGifs() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', trendingUrl, true)

  xhr.onload = function () {
    if (this.status == 200) {
      var gifs = JSON.parse(this.responseText);
      console.log(gifs.data[0].images.original.url);
    }
  }
  xhr.send();
}


submitBtn.addEventListener("click", findGifs);

function findGifs() {
  var searchTerm = searchBox.value
  console.log();
}

