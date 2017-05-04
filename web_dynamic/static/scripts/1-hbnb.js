$(document).ready(function(){
 let selected = [];
 $('input[type=checkbox]').change(function () {
  $(this).each(function() {
    let name = $(this).attr('data-name');
    if ($(this).is(":checked")) {
      selected.push(name);
    } else {
     selected.pop(name);
   }
  });
  if (selected.length === 0) {
    $('.amenities h4').text('\u00A0');
   } else {
    $('.amenities h4').text(selected.join(', '));
   }
});
