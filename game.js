var gamePattern = [];
var userClickedPattern = [];




var buttonColours = ["red", "blue", "green", "yellow"];


var level = 0;
var started = false;





function nextSequence() {

  userClickedPattern = [];


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");

  audio.play();


  level++;
  $("h1").text("Level " + gamePattern.length);
}





$(document).keydown(function() {


  if (!started) {

    nextSequence();

    started = true;

  }

});


function startOver(){

  level = 0;
  gamePattern = [];
  started = false;

}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }


} else {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();

}



}





$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);




  function playSound(name) {


    var colour = new Audio("sounds/" + name + ".mp3");
    colour.play();
  }

  function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    setTimeout(function() {

      $("." + currentColour).removeClass("pressed")
    }, 100);

  }








});
