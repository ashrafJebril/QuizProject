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