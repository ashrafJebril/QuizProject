$(document).ready(function() {
  var questions = [
    "whom you will love the most in the immersive?",
    "How many oscars did the Titanic movie got?",
    "question3",
    "question4",
    "question5"
  ];
  var answers = {
    "whom you will love the most in the immersive?": [
      "Your pair",
      "Ahmad",
      "HIR's",
      "Sanaa"
    ],
    "How many oscars did the Titanic movie got?": [
      "Eight",
      "Nine",
      "Ten",
      "Eleven"
    ],
    question3: [
      "question3 answer1",
      "question3 answer2",
      "question3 answer3",
      "question3 answer4"
    ],
    question4: [
      "question4 answer1",
      "question4 answer2",
      "question4 answer3",
      "question4 answer4"
    ],
    question5: [
      "question5 answer1",
      "question5 answer2",
      "question5 answer3",
      "question5 answer4"
    ]
  };
  var corectAnswers = {
    "Who was the first president of the USA?": "George Washington",
    "How many oscars did the Titanic movie got?": "Eleven",
    question3: "question3 answer1",
    question4: "question4 answer2",
    question5: "question5 answer3"
  };
  var selectedAnswers = {};
  var score = 0;
  var i = 0;
  var isAnswerd = false;
  $("#question").text(i + 1);
  $("#questionsRemaining").text(questions.length - i - 1);
  var question = questions[i];
  $(".bounce").click(function() {
    $(".bounce").remove();
    $(".box").show();

    $(".paragrapQestion").text(question);
    answers[question].forEach(function(element, index) {
      var btn =
        "<button class='button' id=" + index + ">" + element + "</button>";
      var id = "#" + index;

      $(".answers").append(btn);
      $(id).click(answerButtonsClicked);
    });
    $(".box").append("<button class='btnNext'>Next</button>");
    $(".btnNext").click(nextButtonClicked);
  });
  function nextButtonClicked() {
    //Process next button click event

    if (isAnswerd) {
      isAnswerd = !isAnswerd;
      i++;
      if (i === questions.length - 1) {
        console.log("Hi");
        $(".btnNext").text("Finish");
      }
      $("#question").text(i + 1);
      $("#questionsRemaining").text(questions.length - i - 1);
      if (i !== questions.length) {
        question = questions[i];
        $(".paragrapQestion").text(question);
        $(".answers").html("");
        answers[question].forEach(function(element, index) {
          var btn =
            "<button class='button' id=" + index + ">" + element + "</button>";
          var id = "#" + index;
          $(".answers").append(btn);
          $(id).click(answerButtonsClicked);
        });
      } else {
        $("body").html("");
        //TODO: style this in the
        var index = 0;
        var selectedIndex = 10;
        $("body").append('<div id="lastPage"></div>');
        $("#lastPage").append("<div class='score'>Your Score is " + score+"</div>");

        for (var key in answers) {
          console.log(answers[key]);
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
          $("#" + index).css("background-color", "green");
        //  $("#lastPage").append("<br>");
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
    if (!isAnswerd) {
      selectedAnswers[question] = $(this).text();
      $(this).css("background-color", "#3e8e41");
      if (corectAnswers[question] === answers[question][this.id]) {
        score++;
      }
      isAnswerd = !isAnswerd;
    }
  }
  var timeInMinutes = 4;
  var currentTime = Date.parse(new Date());
  var deadLine = new Date(currentTime + timeInMinutes * 60 * 1000);

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