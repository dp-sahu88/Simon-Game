
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


 function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if (currentLevel==level-1){
            setTimeout(function(){nextSequence();},1000);
            userClickedPattern.length = 0;
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
 }

 function startOver(){
        started=false;
        gamePattern.length=0;
        level=0;
        userClickedPattern.length=0;
 }

$(".btn").click(function () {
    userClickedPattern.push($(this).attr('id'));
    playSound($(this).attr('id'));
    animatePress($(this).attr('id'));
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}