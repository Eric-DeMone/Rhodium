var highScoreArray = new Array();
var numHomophoneTypes = 2;
var time = 0;
var gasPercent = 0;
var difficulty = 3;
var gameRunning = false;
var gameTick;
var highScore = 0;
var multiplier = 0.01;
var gasChanger = 0.05;
var gasAdded = 0;
var addGasOn = false;
var questionType = 0;
var questionNumber = 0;
var ansNum = 0;
var money = 0;
var selectedDiv = 0;
var status = 1;
var influence = 0;
var score = 0;
var firstRun = true;

var questionArray = new Array();
var answerArray = new Array();

function selected(n)
{
    selectedDiv=n;
//    answer1.style.backgroundColor = "#ffffff";
//    answer2.style.backgroundColor = "#ffffff";
//    answer3.style.backgroundColor = "#ffffff";
//    switch(n)
//    {
//        case 1:
//        answer1.style.backgroundColor="#cccccc";
//        break;
//        case 2:
//        answer2.style.backgroundColor="#cccccc";
//        break;
//        case 3:
//        answer3.style.backgroundColor="#cccccc";
//        break;
//    }
//    if(selectedDiv == n)
//    {
        answered();
//    }
//    else
//    {
//        selectedDiv=n;
//    }
}

function answered()
{
    var isCorrect = false;
    if(selectedDiv != 0)
    {
        switch(selectedDiv)
        {
            case 1:
                if(document.getElementById("answer1").innerHTML == answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1])
                {
    //                alert("right!");
                    influence+=Math.floor(Math.random()*10+1)*difficulty;
                    isCorrect = true;
                }
                else
                {
    //                alert("wrong!");
                    influence-=Math.floor(Math.random()*20+1)*difficulty*3;
                    gasPercent-=5;
                }
            break;
            case 2:
                if(document.getElementById("answer2").innerHTML == answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1])
                {
    //                alert("right!");
                    influence+=Math.floor(Math.random()*10+1)*difficulty;
                    isCorrect = true;
                }
                else
                {
    //                alert("wrong!");
                    influence-=Math.floor(Math.random()*20+1)*difficulty*3;
                    gasPercent-=5;
                }
            break;
            case 3:
                if(document.getElementById("answer3").innerHTML == answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1])
                {
    //                alert("right!");
                    influence+=Math.floor(Math.random()*10+1)*difficulty;
                    isCorrect = true;
                }
                else
                {
    //                alert("wrong!");
                    influence-=Math.floor(Math.random()*20+1)*difficulty*3;
                    gasPercent-=5;
                }
        }
        answerSelectionText.style.visibility = 'hidden';
        answer1.style.visibility = 'hidden';
        answer2.style.visibility = 'hidden';
        answer3.style.visibility = 'hidden';
        if(isCorrect==true)
        {
//                alert("Right");
            if(statusP.innerHTML=="Transport passenger!")
            {
                sendObstruction(true);
//                sendObstruction(true, Math.floor(Math.random()*1));
                setTimeout(function(){askQuestion()}, 3700);
            }
            else
            {
                setTimeout(function(){askQuestion()}, 1000);
            }
            if(status == 1)
            {
                statusP.innerHTML = "Transport passenger!";
                if(Math.floor(Math.random()*4) == 0 && influence>9*difficulty)
                {
                   status=2; 
                }
                influence=9*difficulty;
                setHasPassenger(true);
            }
            else if(status == 2)
            {
                statusP.innerHTML = "Drop off passenger!";
                status=3;
            }
            else
            {
                status=1;
                money+=influence;
                statusP.innerHTML = "Pick up passenger!";
                setHasPassenger(false);
            }
            score+=difficulty*difficulty*20;
        }
        else
        {
//                 alert("Wrong");
            score-=difficulty*difficulty*80;
            if(statusP.innerHTML=="Transport passenger!")
            {
                sendObstruction(false);
                setTimeout(function(){askQuestion()}, 3700);
            }
            else
            {
                setTimeout(function(){askQuestion()}, 1000);
            }
        }
        if(influence<0)
        {
            influence = 0;
        }
    }
}

function askQuestion()
{
    if(gameRunning)
    {
        answerSelectionText.style.visibility = 'visible';
        answer1.style.visibility = 'visible';
        answer2.style.visibility = 'visible';
        answer3.style.visibility = 'visible';
    }
    selectedDiv=0;
//    answer1.style.backgroundColor = "#ffffff";
//    answer2.style.backgroundColor = "#ffffff";
//    answer3.style.backgroundColor = "#ffffff";
    
    questionType = Math.floor(Math.random() * numHomophoneTypes);
    questionNumber = Math.floor(Math.random() * 5);
    
    answerSelectionText.innerHTML = questionArray[questionType][questionNumber][true];
    
    ansNum=Math.floor(Math.random()*3);
    for(var i = 0; i<3; i++)
    {
        if(ansNum==0)
        {
            document.getElementById("answer1").innerHTML = answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1];
            var temp = document.getElementById("answer1").innerHTML;
            do{
                document.getElementById("answer2").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * numHomophoneTypes) + 1];
            }
            while(temp == document.getElementById("answer2").innerHTML);
            do{
                document.getElementById("answer3").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * numHomophoneTypes) + 1];
            }
            while(document.getElementById("answer3").innerHTML == document.getElementById("answer2").innerHTML || temp == document.getElementById("answer3").innerHTML);
        }
        else if(ansNum==1)
        {
            document.getElementById("answer2").innerHTML = answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1];
            var temp = document.getElementById("answer2").innerHTML;
            do{
                document.getElementById("answer1").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * numHomophoneTypes) + 1];
            }
            while(temp == document.getElementById("answer1").innerHTML);
            do{
                document.getElementById("answer3").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * numHomophoneTypes) + 1];
            }
            while(document.getElementById("answer3").innerHTML == document.getElementById("answer1").innerHTML || temp == document.getElementById("answer3").innerHTML);
        }
        else
        {
            document.getElementById("answer3").innerHTML = answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1];
            var temp = document.getElementById("answer3").innerHTML;
            do{
                document.getElementById("answer2").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * numHomophoneTypes) + 1];
            }
            while(temp == document.getElementById("answer2").innerHTML);
            do{
                document.getElementById("answer1").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * numHomophoneTypes) + 1];
            }
            while(document.getElementById("answer1").innerHTML == document.getElementById("answer2").innerHTML || temp == document.getElementById("answer1").innerHTML);
        }
    }
}

function resetStatus()
{
    if(status == 1)
        {
            statusP.innerHTML = "Transport passenger!";
        }
        else if(status == 2)
        {
            statusP.innerHTML = "Drop off passenger!";
        }
        else
        {
            statusP.innerHTML = "Pick up passenger!";
        }
}

function optionsPage()
{
//    alert("Options Page");
    splashScreenPageDiv.style.visibility = "hidden";
    optionsDiv.style.visibility = "visible";
}
                
function splashScreen()
{
    gradeFourSplashScreen.src = "images/MenuScreen.PNG";
    mainMenuForm.style.visibility = "visible";
    for(var i = 0; i < 10; i++)
    {
        highScoreArray[(i*-1)+9] = 500 * i + 500;
    }
    updateHighScore();
}

function quit()
{
    window.open('', '_self');
    window.close();
}

function runGame()
{
    selectedDiv = 0;
    status = 1;
    influence = 0;
    money = 0;
    score = 0;
    resetStatus();
    bigCanvas.style.visibility = 'hidden';
    splashScreenPageDiv.style.visibility = "visible";
    if(!firstRun)
    {
        mainMenuForm.style.visibility = "visible";
    }
    firstRun = false;
//    play.style.visibility = 'visible';
//    gasCanvas.style.visibility = 'hidden';
    numericStats.style.visibility = 'hidden';
    difficultySelection.style.visibility = 'hidden';
    answerSelection.style.visibility = 'hidden';
    answerSelectionText.style.visibility = 'hidden';
    answer1.style.visibility = 'hidden';
    answer2.style.visibility = 'hidden';
    answer3.style.visibility = 'hidden';
    initializeQuestions();
    optionsDiv.style.visibility = 'hidden';
}

function selectDifficulty()
{
//    alert("Play Game");
    splashScreenPageDiv.style.visibility='hidden';
    mainMenuForm.style.visibility='hidden';
    difficultySelection.style.visibility='visible';
//    var addGasButton = document.createElement("button");
//    addGasButton.innerHTML="Add Gas!";
//    addGasButton.onclick = function(){addGas()};
//    document.body.appendChild(addGasButton);
}

function playGame()
{
    var radios = dif1;
    if(radios.checked)
    {
//        alert("Easy!");
        difficulty=1;
    }
    var radios = dif2;
    if(radios.checked)
    {
//        alert("Medium!");
        difficulty=2;
    }
    var radios = dif3;
    if(radios.checked)
    {
//        alert("Hard!");
        difficulty=3;
    }
    
//    gasCanvas.style.visibility='visible';
    difficultySelection.style.visibility='hidden';
    answerSelection.style.visibility = 'visible';
    bigCanvas.style.visibility = 'visible';
    numericStats.style.visibility = 'visible';
    gasPercent=100;
    time=0;
    update();
    startTimer();
    askQuestion();
}



function addGas()
{
    if(addGasOn)
    {
        if(gasPercent<100&&money>0){
        gasChanger=-0.4;
        }
        else{
        gasChanger=0.03;
        addGasOn=false;}
    }
    else
    {
        gasAdded=0;
        addGasOn=true;
    }
}
function startTimer() {
    gameTick = window.setInterval(function(){requestAnimationFrame(tick)}, 10*((-1*difficulty)+4));
}
function changeGas()
{
    gasPercent-=gasChanger;
    if(gasChanger<0&&money>0)
    {
        gasAdded+=(gasChanger*-1);
        switch(difficulty)
        {
                case 1:
                money-=0.1;
                break;
                case 2:
                money-=0.2;
                break;
                case 3:
                money-=0.3;
                break;
        }
    }
}
function tick() {
    changeGas();
    if(addGasOn)
    {
        addGas(0);
    }
    gasPercent=gasPercent.toFixed(2);
    update();
}
function update() {
    time++;
    multiplier+=0.00001;
    score+=(difficulty*difficulty)*multiplier;
    gameRunning=true;
    if(gasPercent<0)
    {
        clearInterval(gameTick);
        gasPercent=0;
        gameRunning=false;
    }
    if(gameRunning)
    {
        numberDiv.innerHTML = ("Time: "+((time/(1000/(10*((-1*difficulty)+4)))).toFixed(0))+"<br>Score: "+score.toFixed(0));
        moneyP.innerHTML = money.toFixed(2)+"$";
        
//        var drawingCanvas = document.getElementById('gasCanvas');
//        var context = drawingCanvas.getContext("2d");
        
        document.getElementById('gasImageDiv').style.height = ((gasPercent/100)*245).toFixed(0);
        
//        context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
//        context.fillStyle="#8D9E3A";
//        context.strokeStyle="#8D9E3A";
//        context.beginPath();
//        context.arc(drawingCanvas.height, drawingCanvas.height, drawingCanvas.height,(gasPercent/100)*Math.PI,(1+(gasPercent/100))*Math.PI);
//        context.stroke();
//        context.fill();
//        context.fillStyle="#000000";
//        context.font = (drawingCanvas.height/4+"pt Impact");
//        context.fillText(""+gasPercent+"%",drawingCanvas.width/2-(drawingCanvas.height/3),(3*drawingCanvas.height)/3);
    }
    else
    {
        numberDiv.innerHTML = ((time/(1000/(10*((-1*difficulty)+4)))).toFixed(0));
        clearInterval(gameTick);
        checkHighScore();
        runGame();
    }
}

function checkHighScore()
{
    var newPlace = 10;
    for(var i = 0; i < 10; i++)
    {
        if(highScoreArray[i] < score)
        {
            newPlace = i;
            i=10;
        }
    }
    alert(score);
    alert(newPlace);
    var temp1 = 0;
    var temp2 = 0;
    if(newPlace != 10)
    {
        for(var i = 0; i < 10 - newPlace; i++)
        {
            highScoreArray[(i-9)*-1] = highScoreArray[(i-8)*-1];
        }
        highScoreArray[newPlace] = score.toFixed(0);
        updateHighScore();
    }
}

function updateHighScore()
{
    place1.innerHTML = highScoreArray[0];
    place2.innerHTML = highScoreArray[1];
    place3.innerHTML = highScoreArray[2];
    place4.innerHTML = highScoreArray[3];
    place5.innerHTML = highScoreArray[4];
    place6.innerHTML = highScoreArray[5];
    place7.innerHTML = highScoreArray[6];
    place8.innerHTML = highScoreArray[7];
    place9.innerHTML = highScoreArray[8];
    place10.innerHTML = highScoreArray[9];
}

function initializeQuestions()
{
    for(var i = 0; i < 2; i++)
    {
        answerArray[i] = new Array();
        questionArray[i] = new Array();
        for(var j = 0; j < 5; j++)
        {
            questionArray[i][j] = new Array();
        }
    }
    //questionArray[homophone set][question number][true: question false: answer to question]
    //answerArray[homophone set][number of questions in that set (first value only) OR value for each homophone (other members in array)]
    var a = 0;
    var on = 1;
    answerArray[a][0] = 5;
    answerArray[on][0] = 5;
    
    answerArray[a][1] = "a";
    answerArray[a][2] = "\xE0";
    answerArray[on][1] = "on";
    answerArray[on][2] = "ont";
    
    questionArray[a][0][true] = "Hugues ___ d&eacutecid&eacute de suivre descours de guitare.";
    questionArray[a][0][false] = 0;
    
    questionArray[a][1][true] = "Je n'ai plus envie d'aller ___ la mer.";
    questionArray[a][1][false] = 1;
    
    questionArray[a][2][true] = "Louis ___ tellement chaud qu'il a mis son maillot.";
    questionArray[a][2][false] = 0;
    
    questionArray[a][3][true] = "Philippe a gliss&eacute ___ cause de la flaque d'eau.";
    questionArray[a][3][false] = 1;
    
    questionArray[a][4][true] = "Tu verras ma maison, elle ___ des volet verts.";
    questionArray[a][4][false] = 0;
    
    questionArray[on][0][true] = "___ voulait aller &agrave l'op&eacutera, mais ils ont annul&eacute le r&eacutecital.";
    questionArray[on][0][false] = 0;
    
    questionArray[on][1][true] = "Est-ce qu'ils ___ mis leur costume?";
    questionArray[on][1][false] = 1;
    
    questionArray[on][2][true] = "Les professeurs ont entrepris une d&eacutemarche et ___ les appuie.";
    questionArray[on][2][false] = 0;
    
    questionArray[on][3][true] = "Ils ___ trouv&eacute le voisin stationne devant la maison.";
    questionArray[on][3][false] = 1;
    
    questionArray[on][4][true] = "___ a tout essay&eacute pour le r&eacutecup&eacuterer.";
    questionArray[on][4][false] = 0;
}








