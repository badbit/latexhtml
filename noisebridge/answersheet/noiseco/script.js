// Pass a function to jQuery to run when page is ready
$(function() {
  // All links that point to # don't bring you to the top of the page
  $('a[href="#"]').click(function() {
    return false;
  });

  // When anything with class "sign_up" is clicked...
  $('.sign_up').click(function() {
    // This won't work in all browsers - but it sends a message to
    // your console
    console.log('sign up was clicked');
    
    // Position the modal 100 pixels below the currently scrolled
    // position of the document
    $('#modal').css('top', $(document).scrollTop() + 100);

    // Set the overlay to the height of the document    
    $('#overlay').css('height', $(document).height());
    
    // With everything in place, fade the overlay (and contained
    // modal) in
    $('#overlay').fadeIn();
  });
  
  // When anything with class "close_button" is clicked...
  $('.close_button').click(function() {
    // If it is inside anything with id "overlay", fade that
    // thing out
    $(this).closest('#overlay').fadeOut();
  });
  
  // When overlay is clicked, fade it out
  $('#overlay').click(function() {
    $(this).fadeOut();
  });

  // #modal is inside #overlay - this prevents the previous
  // listener from firing when clicking inside #modal
  $('#modal').click(function(event) {
    event.stopPropagation();
  });
  
  /*
  // This allowed us to see how many "click" events were triggered
  // when we clicked on something. It reads off the node (element)
  // names of everything that's been clicked.
  $(':not(.feature_mobile)').click(function() {
    alert($(this)[0].nodeName);
  });
  */
});