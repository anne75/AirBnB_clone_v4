$(document).ready(function () {
  $.getJSON('http://0.0.0.0:5001/api/v1/status/',
    function (res) {
	alert(res.status);
      if (res.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  );
});
