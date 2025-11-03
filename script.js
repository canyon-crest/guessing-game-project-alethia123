// good luck :')

//global variables
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();

//event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",gaveUp);

function play(){
    score = 0; //score to zero for each new game
    playBtn.disabled = true;
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
    msg.textContent = "Guess a number 1-" + level;

    answer = Math.floor(Math.random()*level)+1;
    guess.placeholder = answer;
}

function makeGuess(){
    
    let userGuess = parseInt(guess.value); //make it a number instead of a string
    //number needs only numbers, parseInt can take a number from something also with letters
    score ++; //a valid guess adds to the score
    if(isNaN(userGuess) || userGuess<1 || userGuess>level){
        msg.textContent = "enter a VALID #1-" + level;
        return;
    } else if(userGuess>answer){
        msg.textContent = "Too high!";
    } else if(userGuess<answer){
        msg.textContent = "Too low!";
    } else if(score ==1){
        msg.textContent = "You got it in 1 try! Press play to play again";
        updateScore();
        reset();
    } else{
        msg.textContent = "You got it! It took you " + score + " tries. Press play to play again";
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
    //concatenate string with date info
    return d;
}

function gaveUp(){
    msg.textContent = "Let's try again! Click play to start"
    reset();
}