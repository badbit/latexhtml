// Assign some variables to use throughout the code.
// These are known as "global" variables because they're
// accessible from anywhere in any code in the page.
// These first three variables are strings - text inside
// quotation marks.
var author_name = "JeffreyATW";
var author_url = "http://twitter.com/JeffreyATW";
var avatar_url = "avatar.jpg";
// This variable is an integer - a numeric value that can
// be operated on using arithmetic operators.
var tweet_limit = 140;

// A function that takes no arguments but returns something.
function buildAvatar() {
  // Create a new HTML element wrapped in a jQuery object
  // and assign the object to a variable name.
  var avatar = $('<a class="avatar">');
  // Call the "attr" function on the jQuery object, which,
  // when passing in two arguments, assigns the value of the
  // second argument to the attribute name specified in the
  // first argument.
  // author_url refers to our global variable we defined
  // above.
  avatar.attr('href', author_url);
  
  var avatar_img = $('<img>');
  avatar_img.attr('src', avatar_url);
  avatar_img.attr('alt', author_name);
  
  // Insert the avatar_img (<img>) inside the avatar (<a>).
  avatar.append(avatar_img);
  
  // Have the function output the completed avatar element,
  // which now contains avatar_img.
  return avatar;
}

// A function that takes an argument and returns something.
function buildTweetDetails(tweet_value) {
  var tweet_details = $('<div class="tweet_details">');

  var time = $('<small class="time">now</small>');

  var author = $('<a class="author">');
  author.attr('href', author_url);
  author.text(author_name);

  var tweet_content = $('<p class="tweet_content">');
  // On this line we're setting the tweet content to contain the text
  // of what we've passed into this buildTweetDetails function as
  // tweet_value.
  tweet_content.text(tweet_value);

  tweet_details.append(time).append(author).append(tweet_content);
  
  return tweet_details;
}


// A function that takes no arguments and returns nothing.
function countRemainingCharacters() {
    // Select the textarea inside something with class "tweetbox"
    // and assign its value to tweet_value.
    var tweet_value = $('.tweetbox textarea').val();
    
    // Use arithmetic (subtraction) to calculate the
    // tweet_limit (global variable = 140) minus the
    // length of the tweet_value.
    var remaining_characters = tweet_limit - tweet_value.length;
    
    // Assign the element with class "tweet_counter" to the
    // variable tweet_counter.
    var tweet_counter = $('.tweet_counter');
    tweet_counter.text(remaining_characters);
}

// Functions surrounded in the $() jQuery function are
// executed once the page is done loading.
$(function() {
  // This is an event handler for elements with class
  // "tweetbox". It fires the function when "tweetbox"
  // is submitted (assuming it is a form).
  $('.tweetbox').submit(function() {
    // The "this" variable changes depending on what
    // our scope is. In this case, "this" refers to
    // the element that was submitted (".tweetbox").
    var tweet_value = $(this).find('textarea').val();
    
    // Conditional if/else phrase. If what's in the
    // parentheses is true, do what's inside the "if"
    // block... otherwise do what's in the "else" block.
    if (tweet_value.length > tweet_limit) {
      // alert() is a built-in JavaScript function that
      // pops up a dialog box containing the string
      // we've passed in as an argument.
      alert('Please keep it at 140 or less!');
    } else {
      
      var tweet = $('<article class="tweet clearfix">');
      
      // Assign variables by calling the functions we've
      // defined above.
      var avatar = buildAvatar();
      // Pass in tweet_value which we have defined above.
      var tweet_details = buildTweetDetails(tweet_value);
      
      // We can string together function calls -
      // here we're appending two things to tweet in a row.
      tweet.append(avatar).append(tweet_details);
      
      // The "prepend" function works like "append",
      // except that we insert the object before all
      // existing children instead of after.
      $('.tweets').prepend(tweet);
    }
    
    // Return false so the form isn't submitted, which is
    // the default submit behavior for web browsers.
    return false;
  });
  
  // This is another event handler for when a key is lifted
  // when the focus is on a textarea inside "tweetbox".
  $('.tweetbox textarea').keyup(function() {
    countRemainingCharacters();
  });
  
  // Call countRemainingCharacters upon the page being
  // ready so we can see a starting count before anything
  // is typed. We could also just type "140" into the HTML
  // instead, but it's nice to set numeric values'
  // manually in JavaScript in case they change.
  countRemainingCharacters();
});