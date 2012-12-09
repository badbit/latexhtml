var author_name = "JeffreyATW";
var author_url = "http://jeffreyatw.com";
var avatar_url = "avatar.jpg";

var tweet_limit = 140;

var buildAvatar = function() {
  var $avatar = $('<a class="avatar">');
  $avatar.attr('href', author_url);
  
  var avatar_img = $('<img>');
  avatar_img.attr('src', avatar_url);
  avatar_img.attr('alt', author_name);
    
  $avatar.append(avatar_img);
  
  return $avatar;
}

var buildTweetDetails = function(tweet_value) {
  var tweet_details = $('<div class="tweet_details">');

  var time = $('<small class="time">now</small>');

  var author = $('<a class="author">');
  author.attr('href', author_url);
  author.text(author_name);

  var tweet_content = $('<p class="tweet_content">');
  
  tweet_content.text(tweet_value);

  tweet_details.append(time).append(author).append(tweet_content);
  
  return tweet_details;
}

var countRemainingCharacters = function() {
    var tweet_value = $('.tweetbox textarea').val();
    
    var remaining_characters = tweet_limit - tweet_value.length;
    
    var tweet_counter = $('.tweet_counter');
    tweet_counter.text(remaining_characters);
}

var addClassOnClick = function(action, className) {
  $(action).click(function() {
    $(this).closest('.tweet').children('.dogear').toggleClass(className);
    return false;
  });
}

$(function() {
  $('.tweetbox').submit(function() {    
    var $tweet_textarea = $(this).find('textarea');
    var tweet_value = $tweet_textarea.val();
    
    if (tweet_value.length > tweet_limit) {
      alert('Please keep it at 140 or less!');
    } else {
      $.ajax({
        url: 'tweet.php',
        data: $('.tweetbox').serialize(),
        dataType: 'json',
        type: 'POST',
        success: function(data, textStatus, jqXHR) {
          tweet_value = data.tweet_content;
    
          var $tweet = $('<article class="tweet clearfix">');
          $tweet.append('<i class="dogear">');
          var $avatar = buildAvatar();
          var tweet_details = buildTweetDetails(tweet_value);
          
          $tweet.append($avatar).append(tweet_details);
          
          $('.tweets').prepend($tweet);
          
          $tweet_textarea.val('');
        },
        error: function(data, textStatus) {
          if (textStatus == "404") {
            alert("I tried calling something that doesn't exist!!!");
          } else if (textStatus == "503") {
            alert("That thing is currently unavailable!!!");
          }
        }
      });
    }
    
    
    
    return false;
  });
  
  
  
  $('.tweetbox textarea').keyup(function() {
    countRemainingCharacters();
  });
  
  addClassOnClick('.favorite_action', 'favorited');
  addClassOnClick('.retweet_action', 'retweeted');
  $('.reply_action').click(function() {
    $('.tweetbox textarea').focus().val('@' +
      $(this).closest('.tweet_details').children('.author').text()
    + " ");
    return false;
  });
  
  
  countRemainingCharacters();
});