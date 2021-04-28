var gamePattern=[];
var userClickedPattern=[];
var buttonColours= ["red", "blue", "green", "yellow"];
var level=0;
var started=false;

$(document).keypress(function()  {
    if(!started)
    {
        $("h1").html("Level"+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function()  {
    userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound("sounds/"+userChosenColour+".mp3");
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()  {
    userClickedPattern=[];
    level++;
    $("h1").html("Level"+level);

    randomNumber=Math.floor(Math.random()*4);
    randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound("sounds/"+randomChosenColour+".mp3");
    animatePress(randomChosenColour);
}

function animatePress(currentColour)  {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()  {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(aud)  {
    var audio=new Audio(aud);
    audio.play();
}


function checkAnswer(currentLevel)  {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)  {
            setTimeout(function()  {
                nextSequence();
            }, 1000);
        }
    }
    else {

        console.log("wrong");
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()  {
    level=0;
    started=false;
    gamePattern=[];
  }

