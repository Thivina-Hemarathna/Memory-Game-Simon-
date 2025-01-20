var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;

// Combine start events (keydown or touchstart)
$(document).on("keydown touchstart", function() {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

// Generate the next sequence of colors
function nextSequence() {
    userClickedPattern = []; // Reset user clicked pattern for the new sequence
    level++; // Increment level
    $("#level-title").text("Level " + level);

    // Generate a random color and add it to the game pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash the button to show the next color in the sequence
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play the sound associated with the color
    playSound(randomChosenColour);
}

// Play sound for the given color
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// Animate the button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Handle user click or tap event on buttons
$(".btn").on("click touchstart", function() {  // Handle both mouse and touch events
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    // Play the sound for the chosen color
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check if the user clicked the correct button in the sequence
    checkAnswer(userClickedPattern.length - 1);
});

// Check if the user's answer is correct
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // If the user clicked the correct color
        if (userClickedPattern.length === gamePattern.length) {
            // Wait a bit before starting the next sequence
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // If the user clicked the wrong color
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        // Add game over effects
        $("body").addClass("game-over").delay(200).queue(function(next) {
            $(this).removeClass("game-over");
            next();
        });

        $("h1").text("Game Over, Press Any Key or Tap to Restart");
        startOver();
        // Reset the game state
    }
}

// Reset the game to start over
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
