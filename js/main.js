$(document).ready(function() {

  // Click on Peg
  $('.peg').click(function() {
    $('.peg').not(this).removeClass('active');
    $(this).toggleClass('active');
  });

});