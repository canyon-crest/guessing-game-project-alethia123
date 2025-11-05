// good luck :')

//global variables
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();
let msgName;

//event listeners
nameEntered.addEventListener("click",moveOn);
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",gaveUp);

function moveOn(){
    playBtn.disabled = false;
    msgName = personName.value.charAt(0).toUpperCase() + personName.value.substring(1).toLowerCase();
}

function useTimer(){
    let start = new Date().getTime();
    let stop = new Date().getTime();
    timePassed.textContent = ((start-stop)).toFixed(2);
}

function play(){
    score = 0; //score to zero for each new game
    playBtn.disabled = true;
    nameEntered.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    //give up also enable
    giveUp.disabled = false;

    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = msgName + ", guess a number 1-" + level;

    answer = Math.floor(Math.random()*level)+1;
    guess.placeholder = answer; //delete at end

    let timer = setInterval(useTimer, 10); //STUPID TIMER ISN'T WORKING
}

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
function reset(){
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
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}
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
    return dow + ", " + month + " " + day + " "+ year
}

function gaveUp(){
    msg.textContent = msgName + ", let's try again! Click play to start"
    reset();
}