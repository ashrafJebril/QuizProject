$(document).ready(function() {
    var questions = ['Who was the first president of the USA?', 'How many oscars did the Titanic movie got?','question3','question4','question5','question6','question7','question8','question9','question10']
    var answers = {
    'Who was the first president of the USA?':['Thomas Jefferson','George Washington', 'Abraham Lincoln','John Adams'],
    'How many oscars did the Titanic movie got?':['Eight','Nine','Ten', 'Eleven'],
    'question3':['question3 answer1','question3 answer2','question3 answer3','question3 answer4'],
    'question4':['question4 answer1','question4 answer2','question4 answer3','question4 answer4'],
    'question5':['question5 answer1','question5 answer2','question5 answer3','question5 answer4'],
    'question6':['question6 answer1','question6 answer2','question6 answer3','question6 answer4'],
    'question7':['question7 answer1','question7 answer2','question7 answer3','question7 answer4'],
    'question8':['question8 answer1','question8 answer2','question8 answer3','question8 answer4'],
    'question9':['question9 answer1','question9 answer2','question9 answer3','question9 answer4'],
    'question10':['question10 answer1','question10 answer2','question10 answer3','question10 answer4']

}
var corectAnswers = {
    'Who was the first president of the USA?':'George Washington',
    'How many oscars did the Titanic movie got?':'Eleven',
    'question3': 'question3 answer1'
}
$('.bounce').click(function() {
    $(".bounce").remove()
    $(".box").show()

var score = 0;
var i = 0
$('.paragrapQestion').text(questions[0])
  
            answers[questions[0]].forEach(function(element, index) {

        $('.box').append( "<button class='button' id="+ index + ">" + element + "</button>" );

    })
            $('.box').append( "<button class='btnNext'>Next</button>" );
            })
 $('.btnNext').click(function (event) {
    //Process next button click event
 
    if(i !== questions.length){
    var question = questions[i]
    $('.paragrapQestion').text(question)
    //$('.').html('')
            answers[question].forEach(function(element, index) {

        $('.box').append( "<button class='button' id="+ index + ">" + element + "</button>" );

    })
    

         $('.button').click(function (event) {
    //Process answer button click event
 
    if(corectAnswers[question] === answers[question][this.id]){
        score++;
    }
        i++;
    })
     }else{
         alert(score)
     }
    })


var timeInMinutes = 5;
var currentTime = Date.parse(new Date());  
var deadLine = new Date(currentTime + timeInMinutes*60*1000);


function timeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function runClock(id,endtime){
    var clock = document.getElementById(id);
    function updateClock(){
        var t = timeRemaining(endtime);
        clock.innerHTML = t.minutes+': '+t.seconds;
        if(t.total<=0){ clearInterval(timeInterval); }
    }
    updateClock(); // run function once at first to avoid delay
    var timeInterval = setInterval(updateClock,1000);
}
runClock('lbl0',deadLine);

})
