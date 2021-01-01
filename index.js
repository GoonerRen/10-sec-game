$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var plus = 0;
  var minus = 0;
  var times = 0;
  var divide = 0;

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function (size) {
    //return Math.ceil(Math.random() * size);
    range = $("#number-limit").val();
    return Math.floor(Math.random() * range)
  };

  var questionGenerator = function () {

    if (plus === 1) {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  }

  if (minus === 1) {
  var question = {};
  var num1 = randomNumberGenerator(10);
  var num2 = randomNumberGenerator(10);

  question.answer = num1 - num2;
  question.equation = String(num1) + " - " + String(num2);


  return question;
}

if (times === 1) {
var question = {};
var num1 = randomNumberGenerator(10);
var num2 = randomNumberGenerator(10);

question.answer = num1 * num2;
question.equation = String(num1) + " * " + String(num2);


return question;
}

if (divide === 1) {
var question = {};
var num1 = randomNumberGenerator(10);
var num2 = randomNumberGenerator(10);

question.answer = num1 / num2;
question.equation = String(num1) + " / " + String(num2);


return question;
}

else {
var question = {};
var num1 = randomNumberGenerator(10);
var num2 = randomNumberGenerator(10);

question.answer = num1 + num2;
question.equation = String(num1) + " + " + String(num2);

return question;
}

};

document.getElementById('question-plus').onclick = function() {

    if ( this.checked ) {
      console.log(plus);
      console.log("plus");
      plus ++;
    return  renderNewQuestion();


    } else {
        plus = 0;
    }
};
document.getElementById('question-minus').onclick = function() {

    if ( this.checked ) {

      minus ++;
    return  renderNewQuestion();


    } else {
        minus = 0;
    }
};
document.getElementById('question-times').onclick = function() {

    if ( this.checked ) {
      times ++;
    return  renderNewQuestion();


    } else {
        times = 0;
    }
};
document.getElementById('question-divide').onclick = function() {

    if ( this.checked ) {

      divide ++;
    return  renderNewQuestion();


    } else {
        divide = 0;
    }
};


$("#number-limit").on("input change", function() {
    console.log("ranger");
  renderNewQuestion();
});


  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
});
