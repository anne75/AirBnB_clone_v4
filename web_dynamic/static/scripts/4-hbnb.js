$(document).ready(function () {
  let selected = [];
  let am_id = [];
// checkboxes amenity
  $('input[type=checkbox]').change(function () {
    $(this).each(function () {
      let name = $(this).attr('data-name');
      if ($(this).is(':checked')) {
        selected.push(name);
        am_id.push($(this).attr('data-id'));
      } else {
        selected.pop(name);
        am_id.pop($(this).attr('data-id'));
      }
      if (selected.length === 0) {
        $('.amenities h4').text('\u00A0');
      } else {
        $('.amenities h4').text(selected.join(', '));
      }
    });
  });
// red and grey disc
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      if (res.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    },
    error: function (res) {
      $('DIV#api_status').removeClass('available');
    }
  });
// build places
  makePlaces({});
//filter places by selected amenities
  $('button').click(function () {
      makePlaces({'amenities': am_id});
  });

});

function makePlaces(dict) {
  console.log("makePlaces arguments");
  console.log(dict);
  $('.places').empty();
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(dict),
    error: function (res) {
      $('.places').append('<p>Server issue</p>');
      console.log(res);
    },
    success: function (res) {
      console.log("results");
      console.log(res);
      $.each(res, function (k, v) {
        let article = $('<article>');
        article.append($('<div>', {'class': 'price_by_night', 'text': '$' + v.price_by_night}));
        article.append($('<h2>').text(v.name));
        let info = $('<div>', {'class': 'informations'});
        info.append($('<div>', {'class': 'max_guest', 'text': v.max_guest + 'Guests'}));
        info.append($('<div>', {'class': 'number_rooms', 'text': v.number_rooms + 'Rooms'}));
        info.append($('<div>', {'class': 'number_bathrooms', 'text': v.number_bathrooms + 'Bathrooms'}));
        article.append(info);
        article.append($('<div>', {'class': 'user', 'html': '<b>Owner</b>: ' + v.user_id}));
       	article.append($('<div>', {'class': 'description', 'html': v.description}));
        $('.places').append(article);
      });
    }
  });
};
