var pointer = 0;
var step = 0;

function populateCountries(populate_value) {
  step = populate_value;
  max = pointer + step;
  Handlebars.registerPartial("country", $('#country-template').html());
  var source = $('#country-template').html();
  var template = Handlebars.compile(source);
  $.ajax({
    url: '/',
    dataType: 'json',
    type: 'GET'
  }).done(function(data){
    for (pointer; pointer < max && data.countries.length; pointer++) {
      var templateHTML = template(data.countries[pointer]);
      $('#content').append(templateHTML);
    }
  });
}

function populateAll() {
  Handlebars.registerPartial("country", $('#country-template').html());
  var source = $('#data-template').html();
  var template = Handlebars.compile(source);
  $.ajax({
    url: '/',
    dataType: 'json',
    type: 'GET'
  }).done(function(data){
    var templateHTML = template(data);
    $('#content').append(templateHTML);
  });
}

// Create the event bindings
$(document).ready(function() {
  // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
  // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
  $('#populate-button').click(populateClick);
  $('#all-button').click(allButtonClick);
  $('#reset-button').click(function() {
    // this function resets the button and scroll bindings, and sets pointer to 0
    pointer = 0;
    $('#content').html('');
    $(window).unbind('scroll').scroll(scrollFunction);
    $('#populate-button').unbind('click').click(populateClick);
    $('#all-button').unbind('click').click(allButtonClick);
  });

  $(window).scroll(scrollFunction);

  function scrollFunction() {
    var win = $(window);
    // Infinite scroll math!
    if(win.height() + win.scrollTop() >= $(document).height()) {
      if (pointer < 272) {
        populateCountries(parseInt($('#step-input').val()));
      }
    }
  }

  // Disables other buttons and scroll event so we don't get duplicate data
  // This serves as a demonstration; we could also just set pointer = false
  function allButtonClick() {
    $(window).unbind('scroll');
    $('#populate-button').unbind('click');
    $('#all-button').unbind('click');
    populateAll();
  }

  function populateClick() {
    $(window).unbind('scroll');
    $('#all-button').unbind('click');
    populateCountries(parseInt($('#step-input').val(), 10));
  }

});
