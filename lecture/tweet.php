<?php
  header('Content-type: application/json');
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo json_encode(array('tweet_content' => "I am a butt", 'tweet_author' => 'JeffreyATW', 'tweet_avatar' => 'jeffreyatw.jpg'));
  } else {
    echo json_encode(array('tweet_content' => 'This is a canned tweet', 'tweet_author' => 'RandomDude', 'tweet_avatar' => 'randomdude.jpg'));
  }
?>