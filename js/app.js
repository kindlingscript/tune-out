var picture = 0;

var showPhotos = function(photos) {
  console.log(photos);

  var result = $('.image-template').clone();

  var image = result.find('.shown');

  var url = "https://farm" + photos[0].farm + ".staticflickr.com/" + photos[0].server + "/" + photos[0].id + "_" + photos[0].secret + "_b.jpg";
  console.log(url);

  image.html('<img src=' + url + '</>');

  return result;
};

var getMedia = function(searchTerm) {
  // get pictures from Flickr
  var request = {
    per_page: 25
  };

  // get array of photos by tags
  $.ajax({
    type: "GET",
    data: request,
    dataType: 'jsonp',
    contentType: "application/jsonp; charset=utf-8",
    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=04cdb7e0cab8f9b4b167fa8d5dfa0664&tags=" + searchTerm + "&format=json",
    jsonpCallback: 'jsonFlickrApi',
    success: function(result) {
      // console.log(result);
      // console.log(data.photos.photo[0].farm);

      // var image = "https://farm" + data.photos.photo[0].farm + ".staticflickr.com/" + data.photos.photo[0].server + "/" + data.photos.photo[0].id + "_" + data.photos.photo[0].secret + ".jpg";
      // $(".image").append("<img src=" + image + ">");

      // grab IDs of photos
      $.each(result.photos, function(index, value) {
        // console.log(index, value);
        
        if (index === "photo") {
          var photos = value;
          console.log(value);
          var stream = showPhotos(photos); 
        }
        
        $('.image-results').append(stream);
      });
    }
  });
};

//https://farm8.staticflickr.com/7256/26795224544_34830daa02.jpg

$(function() {
  $(".search-form").submit(function(e) {
    e.preventDefault();
    var searchTerm = $(".input").val();
    console.log(searchTerm);
    // add in-between page to get user to specify favorite genre listed in drop-down menu?
    $(".container").hide();
    $("body").removeClass('background-image');
    getMedia(searchTerm);
  });
});