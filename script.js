// good luck :')

//global variables
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const timeArr = [];
let msgName, timeLocal, playTimer, guessTime;

date.textContent = time();

//event listeners
nameEntered.addEventListener("click",moveOn);
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",gaveUp);

//after name is entered
function moveOn(){
    playBtn.disabled = false;
    msgName = personName.value.charAt(0).toUpperCase() + personName.value.substring(1).toLowerCase();
}

setInterval(localTime, 1000);
function localTime(){
    local.textContent = new Date().toLocaleTimeString();
}

function play(){
    score = 0; //score to zero for each new game
    playBtn.disabled = true;
    nameEntered.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUp.disabled = false;

    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = msgName + ", guess a number 1-" + level;

    answer = Math.floor(Math.random()*level)+1;
    //guess.placeholder = answer; //delete at end

    playTimer = setInterval(useTimer, 10);
    let start = new Date().getTime();    
    function useTimer(){ 
        let stop = new Date().getTime();
        timePassed.textContent = ((stop-start)/1000).toFixed(2); 
        guessTime = Number(((stop-start)/1000).toFixed(2));
        //save this thingamajig as a variable, push to time array, sort time array etc etc. so define global variable outside then set what it is here then make another like timesort function or somethg
    }
}

//when guess is clicked
function makeGuess(){
    
    let userGuess = parseInt(guess.value); //make it a number instead of a string
    //number needs only numbers, parseInt can take a number from something also with letters
    let tempMsg = "";
    score ++; //a valid guess adds to the score

    //hot or cold
    if(Math.abs(userGuess-answer)<3){
        tempMsg = "Hot";
    } else if (Math.abs(userGuess-answer)<11){
        tempMsg = "Warm";
    } else if (Math.abs(userGuess-answer)<21){
        tempMsg = "Lukewarm";
    } else {
        tempMsg = "Cold";
    }

    //answer feedback
    if(isNaN(userGuess) || userGuess<1 || userGuess>level){
        msg.textContent = msgName + ", enter a VALID #1-" + level;
        return;
    } else if(userGuess>answer){
        msg.textContent = "Too high! " + tempMsg;
    } else if(userGuess<answer){
        msg.textContent = "Too low! " + tempMsg;
    } else if(score ==1){ 
        msg.textContent = msgName + ", you got it in 1 try! Press play to play again";
        updateScore();
        reset();
    } else if(score<=3){
        msg.textContent = msgName + ", you got it! It took you " + score + " tries. Really good! Press play to play again";
        updateScore();
        reset();
    } else if(score<=7){
        msg.textContent = msgName + ", you got it! It took you " + score + " tries. Not bad! Press play to play again";
        updateScore();
        reset();
    } else if(score<=10){
        msg.textContent = msgName + ", you got it! It took you " + score + " tries. Doing okay-- Press play to play again";
        updateScore();
        reset();
    } else{
        msg.textContent = msgName + ", you got it! It took you " + score + " tries. Could be better.. Press play to play again";
        updateScore();
        reset();
    }
  
}

//ready to click play and start again
function reset(){
    clearInterval(playTimer);
    guessBtn.disabled = true;
    guess.disabled = true;
    giveUp.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    for(let i=0;i<levelArr.length;i++){
        levelArr[i].disabled = false;
    }
}

//adding score to array, sorting, counting wins, adding to leaderboard, calc avg
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b); //sort in increasing order
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    for(i=0;i<scoreArr.length; i++){
        sum += scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average score: " + avg.toFixed(2);
    timeArr.push(guessTime);
    timeArr.sort((a,b)=>a-b);
    fastestGame.textContent = "Fastest time: " + timeArr[0];
    let add = 0;
    for(i=0; i<timeArr.length; i++){
        add += timeArr[i];
    }
    let avrg = add/timeArr.length;
    avgTime.textContent = "Average time: " + avrg.toFixed(2);
}

//for date and time at the top
function time(){
    let d = new Date();
    let month = d.getMonth();
    switch(month){
        case 0: month = "January"; break; //full month name
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
    }
    let day = d.getDate();
    if(day==1||day==21||day==31){ //adding suffixes
        day = day + "st";
    } else if(day==2||day==22){
        day = day + "nd";
    } else if(day==3||day==23){
        day = day + "rd";
    } else{
        day = day + "th";
    }
    let year = d.getFullYear();
    let dow = d.getDay();
    switch(dow){
        case 0: dow = "Sunday"; break; //full day of the week
        case 1: dow = "Monday"; break;
        case 2: dow = "Tuesday"; break;
        case 3: dow = "Wednesday"; break;
        case 4: dow = "Thursday"; break;
        case 5: dow = "Friday"; break;
        case 6: dow = "Saturday"; break;
    }

    return dow + ", " + month + " " + day + " "+ year;
}

//giveup button
function gaveUp(){
    msg.textContent = msgName + ", let's try again! Click play to start";
    reset();
}