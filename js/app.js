
$(document).ready(function(){
	
	var secretNumber = Math.floor((Math.random(0) * 100) + 1);
	var numGuesses = 0;
	var lastGuess = 0;
	var userGuess = $('#userGuess');
	var feedBack = $('#feedback');
	var count = $('#count');
	var guessList = $('#guessList');

	userGuess.focus();

	// Test the guess
	var testGuess = function(guess){
		if (secretNumber - guess === 0) {
			feedBack.text("You Win!!! The Secret Number: "+guess);
			userGuess.val("").focus();
		} else {
			if(lastGuess == 0) {
				if (Math.abs(secretNumber - guess) > 50){
					feedBack.text("You're ice cold!! Try again!!");
				} else if (Math.abs(secretNumber - guess) > 30){
					feedBack.text("You're cold!! Try again!!");
				} else if (Math.abs(secretNumber - guess) > 20){
					feedBack.text("You're warm!! Try again!!");
				} else if (Math.abs(secretNumber - guess) > 10){
					feedBack.text("You're hot!! Try again!!");
				} else {
					feedBack.text("You're very hot!! Try again!!");
				};
			} else if(Math.abs(secretNumber - guess) < Math.abs(secretNumber - lastGuess)){
				feedBack.text("Getting warmer!! Try again!!");
			} else if (Math.abs(secretNumber - guess) > Math.abs(secretNumber - lastGuess)) {
				feedBack.text("Getting colder!! Try again!!");
			} else {
				feedBack.text("Try again!!");
			};
			userGuess.val("").focus();
		};
		lastGuess = guess;
		numGuesses++;
		count.text(numGuesses);
		guessList.append('<li class="guess-li">'+guess+'</li>');
	};

		// Validate the guess
	var validateNumber = function(my_num){
      if (my_num === NaN) {
        feedBack.text("Please enter a whole number between 1 and 100");
        userGuess.val("").focus();
      } else if ((my_num % 1 != 0) || (my_num < 1) || (my_num > 100)) {
        feedBack.text("Please enter a whole number between 1 and 100");
        userGuess.val("").focus();
      } else {
        testGuess(my_num);
      };
  	};

	// Start a new game
	var newGame = function(){
		$(".guess-li").remove();
		lastGuess = 0;
		numGuesses = 0;
		count.text(numGuesses);
		secretNumber = Math.floor((Math.random() * 100) + 1);
		userGuess.val("").focus();
		feedBack.text("Please enter a whole number between 1 and 100");
	};

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
    	return false;
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  		return false;
  	});

  	/*--- Take a guess ---*/
  	$("#userGuess").on("keydown", function(e){
  		if(e.keyCode == 13){
			var myGuess = userGuess.val();
  			validateNumber(myGuess);
  			return false;
  		};
  	});

	$("#guessButton").click(function(){
  		var myGuess = userGuess.val();
  		validateNumber(myGuess);
  		return false;
  	});

  	/*--- Start a new game ---*/
  	$(".new").click(function(){
  		newGame();
  		return false;
  	});

});


