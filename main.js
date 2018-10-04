$(document).ready(function() {
  var questions = [
  "Who is the first US president?",
  "In which year did Nancy Ajram sang اخاصمك اه?",
  "Whats Jozza mostly Known for?",
  "Whom you will love the most in the immersive?",
  "Who love's Ahmad????????"
  ];
  var answers = {
    "Whom you will love the most in the immersive?": [
      "Your pair",
      "Ahmad",
      "HIR's",
      "Sanaa"
    ],
    "In which year did Nancy Ajram sang اخاصمك اه?": [
      "2001",
      "2009",
      "2002",
      "2003"
    ],
    "Whats Jozza mostly Known for?": [
    "loud voice", 
    "bad in english",
    "great lecturer",
    "all"
      ],
   
    "Who is the first US president?": [
      "George Washington",
      "Abraham Lincoln",
      "John Tyler",
      "John F. Kennedy"
    ],
    "Who love's Ahmad????????": [
      "NO One",
      "No One",
      "No One",
      "Everyone"
    ]
  };
  var corectAnswers = {
    "Whom you will love the most in the immersive?":"Sanaa",
    "In which year did Nancy Ajram sang اخاصمك اه?":"2003",
    "Whats Jozza mostly Known for?": "all",
    "Who is the first US president?": "George Washington",
    "Who love's Ahmad????????": "Everyone"
  };
  var selectedAnswers = {};
  var score = 0;
  var i = 0;

  var isAnswerd = false;
  var timeInMinutes = 5;
  var currentTime = Date.parse(new Date());
  var deadLine = new Date(currentTime + timeInMinutes * 60 * 1000);

  //updating the question span counter
  $("#question").text(i + 1);
  //updating the question span counter
  $("#questionsRemaining").text(questions.length - i - 1);
  var question = questions[i];

  $(".bounce").click(function() {
    //remove the bounce button from body and show the div with class box
    $(".bounce").remove();
    $(".box").show();
    //displaying the question and the answers using forEach loop
    $(".paragrapQestion").text(question);
    answers[question].forEach(function(element, index) {
      var btn =
        "<button class='button' id=" + index + ">" + element + "</button>";
      var id = "#" + index;
      $(".answers").append(btn);
      $(id).click(answerButtonsClicked);
    });
    $(".box").append("<button class='btnNext'>Next</button>");
    //adding click event to buttons
    $(".btnNext").click(nextButtonClicked);
  });
  function nextButtonClicked() {
    //Process next button click event
    //check only if the user answered the question before going for the next one
    if (isAnswerd) {
      isAnswerd = !isAnswerd;
      i++;
      //if we reached the last question it will chage the text of the button to finsh
      if (i === questions.length - 1) {
        $(".btnNext").text("Finish");
      }
      $("#question").text(i + 1);
      $("#questionsRemaining").text(questions.length - i - 1);
      if (i !== questions.length) {
        question = questions[i];
        $(".paragrapQestion").text(question);
        $(".answers").html("");
        //appending the answers buttons
        answers[question].forEach(function(element, index) {
          var btn =
            "<button class='button' id=" + index + ">" + element + "</button>";
          var id = "#" + index;
          $(".answers").append(btn);
          $(id).click(answerButtonsClicked);
        });
      } else {
        //when the user finished the quize remove the body elements and append a new div
        $("body").html("");
        var index = 0;
        var selectedIndex = 10;
        $("body").append('<div id="lastPage"></div>');
        $("#lastPage").append(
          "<div class='score'>Your Score is " + score + "</div>"
        );
        // appending all the questions with the correct answers and the selected answers
        for (var key in answers) {
          $("#lastPage").append("<br>");
          $("#lastPage").append(key);
          $("#lastPage").append("<br>");
          $("#lastPage").append(
            "<button  class='lastButtonAswers' id=" +
              index +
              ">" +
              corectAnswers[key] +
              "</button>"
          );
          $("#" + index).css("background-color", "#4EB678");
          if (corectAnswers[key] !== selectedAnswers[key]) {
            $("#lastPage").append(
              "<button class='lastButtonAswers' id=" +
                selectedIndex +
                ">" +
                selectedAnswers[key] +
                "</button>"
            );

            $("#" + selectedIndex).css("background-color", "red");
          }
          selectedIndex++;
          index++;
        }
      }
    } else {
      alert("Please select answer!");
    }
  }

  function answerButtonsClicked() {
    //preventing more than one answer is selected
    if (!isAnswerd) {
      //changing the button color
      selectedAnswers[question] = $(this).text();
      $(this).css("background-color", "rgb(139,139,139)");
      $(this).css("color", "rgb(237,251,87)");
      //increasing the score if the answer is correct
      if (corectAnswers[question] === answers[question][this.id]) {
        score++;
      }
      isAnswerd = !isAnswerd;
    }
  }
  //setting the count down timer
  function timeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  function runClock(id, endtime) {
    var clock = document.getElementById(id);
    function updateClock() {
      var t = timeRemaining(endtime);
      clock.innerHTML = t.minutes + ": " + t.seconds;
      if (t.total <= 0) {
        alert("Time's Up Game Over");
        clearInterval(timeInterval);
      }
    }
    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
  }
  runClock("lbl0", deadLine);
});

