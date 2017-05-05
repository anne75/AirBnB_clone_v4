$(document).ready(function () {
  // checkboxes amenity
  let selected = [];
  let am_id = [];
  $('.amenities input[type=checkbox]').change(function () {
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
  // checkboxes state
  let st_selected = [];
  let state_id = [];
  $('.locations input[type=checkbox]').change(function () {
    $(this).each(function () {
      let name = $(this).attr('data-name');
      if ($(this).is(':checked')) {
        st_selected.push(name);
        state_id.push($(this).attr('data-id'));
      } else {
        st_selected.pop(name);
        state_id.pop($(this).attr('data-id'));
      }
      if (st_selected.length === 0) {
        $('.locations h4').text('\u00A0');
      } else {
        $('.locations h4').text(st_selected.join(', '));
      }
    });
  });
 // checkboxes city
 let ct_selected = [];
 let city_id = [];
 $('.locations.small_list input[type=checkbox]').change(function () {
    $(this).each(function () {
      let name = $(this).attr('data-name');
      if ($(this).is(':checked')) {
        ct_selected.push(name);
        city_id.push($(this).attr('data-id'));
      } else {
        ct_selected.pop(name);
        city_id.pop($(this).attr('data-id'));
      }
      if (ct_selected.length === 0) {
        $('.locations h4').text('\u00A0');
      } else {
        $('.locations h4').text(ct_selected.join(', '));
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
      // adding state and city filters
      makePlaces({'states': state_id});
      makePlaces({'cities': city_id});
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
