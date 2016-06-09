// get window height to display photos
var h = window.innerHeight;

var getMedia = function(searchTerm, genreLiked) {
  // initializa SoundCloud client
  SC.initialize({
  client_id: '5795b3a3f6ecac359f77f3729597a8bf'
  });

  // array to push urls into to then play them all
  songUrls = [];

  // get SoundCloud urls & play them
  SC.get('/tracks', {
    q: 'ambient', tags: genreLiked, license: 'cc-by-sa', limit: 7
  }).then(function(tracks) {
    // console.log(tracks);
    $.each(tracks, function() {
      // console.log(this.permalink_url);
      songUrls.push(this.permalink_url);
    })
    songUrls = String(songUrls);
    console.log(songUrls);
    $.stratus({
    key: "5795b3a3f6ecac359f77f3729597a8bf",
    links: songUrls,
    color: '000',
    stats: false,
    buying: false,
    auto_play: true
  });
  });

  // get pictures from Flickr
  var request = {
    per_page: 50,
    tags: searchTerm
  };

  // get array of photos by search term tags
  $.ajax({
    type: "GET",
    data: request,
    dataType: 'jsonp',
    contentType: "application/jsonp; charset=utf-8",
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e56f062c0fc2e0d9d3fe76d5b93045be&text=" + searchTerm + "&format=json",
    jsonpCallback: 'jsonFlickrApi',
    success: function(result) {
      var imageLoop = [];

      $.each(result.photos.photo, function(index, value) {
        // console.log(value);

        var url = "<img src='https://farm" + value.farm + ".staticflickr.com/" + value.server + "/" + value.id + "_" + value.secret + "_c.jpg'>";

        imageLoop.push(url);
      });

      for (var i = 0; i < imageLoop.length; i++) {
        // console.log(imageLoop[i]);
        $('.slideshow').css('height', h).append(imageLoop[i]);
           $('.slideshow').cycle({
              fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
          });
      }
      // console.log(imageLoop);
    }
  });
};

var getGenre = function(searchTerm) {
  $('.genre-getter').submit(function(e) {
    e.preventDefault();
    var genreLiked = $('option:selected').text();
    $('body').removeClass('background-image');
    console.log('Search term: ' + searchTerm);
    console.log('Genre: ' + genreLiked);
    $('.genre-box').hide();

    getMedia(searchTerm, genreLiked);
  });
};

$(function() {
  $('.search').submit(function(e) {
    e.preventDefault();
    var searchTerm = $(".search-term").val();
    $('.container').hide();
    $('.genre-box').show();

    getGenre(searchTerm);
  });
});