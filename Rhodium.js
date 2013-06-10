var highScoreArray = new Array();
var numHomophoneTypes = 4;
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
var playerName = "Anonyme";

var questionArray = new Array();
var answerArray = new Array();
var portraitNum = 0;

function portraitClicked(n)
{
    portraitNum=n;
    if(n==0)
    {
        manPicture.style.border = "2px solid #33FF33";
        womanPicture.style.border = "2px solid #FFFF99";
        portraitGameImage.src="images/man.png";
    }
    else
    {
        manPicture.style.border = "2px solid #FFFF99";
        womanPicture.style.border = "2px solid #33FF33";
        portraitGameImage.src="images/woman.png";
    }
}

function selected(n)
{
    selectedDiv=n;
    answered();
}

function changeLighting(n){
	if(n>=360){
	}
	else
	{
		updateShading(Math.abs(((n-180)/180)) * 0.5);
	}
    if((difficulty == 1 && n == 120))
    {
        difficulty++;
    }
    else if((difficulty == 2 && n == 240))
    {
        difficulty++;
    }
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
            if(statusP.innerHTML=="Transportez le passager!")
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
                statusP.innerHTML = "Transportez le passager!";
                if(Math.floor(Math.random()*4) == 0 && influence>9*difficulty)
                {
                   status=2; 
                }
                influence=9*difficulty;
                setHasPassenger(true);
            }
            else if(status == 2)
            {
                statusP.innerHTML = "D&eacuteposez le passager!";
                status=3;
            }
            else
            {
                status=1;
                money+=influence;
                statusP.innerHTML = "Ramassez le passager!";
                setHasPassenger(false);
            }
            score+=difficulty*difficulty*20;
        }
        else
        {
//                 alert("Wrong");
            score-=difficulty*difficulty*80;
            if(statusP.innerHTML=="Transportez le passager!")
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
    questionNumber = Math.floor(Math.random() * 10);
    
    answerSelectionText.innerHTML = questionArray[questionType][questionNumber][true];
    
    ansNum=Math.floor(Math.random()*3);
    for(var i = 0; i<3; i++)
    {
        if(ansNum==0)
        {
            document.getElementById("answer1").innerHTML = answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1];
            var temp = document.getElementById("answer1").innerHTML;
            do{
                document.getElementById("answer2").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * 2) + 1];
            }
            while(temp == document.getElementById("answer2").innerHTML);
            do{
                document.getElementById("answer3").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * 2) + 1];
            }
            while(document.getElementById("answer3").innerHTML == document.getElementById("answer2").innerHTML || temp == document.getElementById("answer3").innerHTML);
        }
        else if(ansNum==1)
        {
            document.getElementById("answer2").innerHTML = answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1];
            var temp = document.getElementById("answer2").innerHTML;
            do{
                document.getElementById("answer1").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * 2) + 1];
            }
            while(temp == document.getElementById("answer1").innerHTML);
            do{
                document.getElementById("answer3").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * 2) + 1];
            }
            while(document.getElementById("answer3").innerHTML == document.getElementById("answer1").innerHTML || temp == document.getElementById("answer3").innerHTML);
        }
        else
        {
            document.getElementById("answer3").innerHTML = answerArray[questionType][(questionArray[questionType][questionNumber][false]) + 1];
            var temp = document.getElementById("answer3").innerHTML;
            do{
                document.getElementById("answer2").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * 2) + 1];
            }
            while(temp == document.getElementById("answer2").innerHTML);
            do{
                document.getElementById("answer1").innerHTML = answerArray[Math.floor(Math.random() * numHomophoneTypes)][Math.floor(Math.random() * 2) + 1];
            }
            while(document.getElementById("answer1").innerHTML == document.getElementById("answer2").innerHTML || temp == document.getElementById("answer1").innerHTML);
        }
    }
}

function resetStatus()
{
    if(status == 1)
        {
            statusP.innerHTML = "Transportez le passager!";
        }
        else if(status == 2)
        {
            statusP.innerHTML = "D&eacuteposez le passager!";
        }
        else
        {
            statusP.innerHTML = "Ramassez le passager!";
        }
}

function instructionsClicked()
{
    if(instructionsButton.innerHTML == "Instructions")
    {
        instructionsButton.innerHTML = "Highscores";
        highScoreForm.style.visibility = "hidden";
        instructionsDiv.style.visibility = "visible";
    }
    else
    {
        instructionsButton.innerHTML = "Instructions";
        highScoreForm.style.visibility = "visible";
        instructionsDiv.style.visibility = "hidden";
    }
}
                
function optionsPage()
{
//    alert("Options Page");
    splashScreenPageDiv.style.visibility = "hidden";
    optionsDiv.style.visibility = "visible";
    highScoreForm.style.visibility = "visible";
    difficultySelection.style.visibility='visible';
    if(nameField.value == ""){nameField.value = "Anonyme";}
    portraitGameImage.style.visibility = "hidden";
}

function clearNameField()
{
    nameField.value = "";
}   
    
function splashScreen()
{
    gradeFourSplashScreen.src = "images/MenuScreen.PNG";
    mainMenuForm.style.visibility = "visible";
    for(var i = 0; i < 10; i++)
    {
        highScoreArray[(i*-1)+9] = 500 * i + 500;
        highScoreArray[(i*-1)+19] = "Anonyme";
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
    playerName = "Anonyme";
    selectedDiv = 0;
    status = 1;
    influence = 0;
    money = 0;
    score = 0;
    resetStatus();
    bigCanvas.style.visibility = 'hidden';
    splashScreenPageDiv.style.visibility = "visible";
    portraitGameImage.style.visibility = "hidden";
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
    instructionsDiv.style.visibility = "hidden";
    highScoreForm.style.visibility = "hidden";
    initializeQuestions();
    optionsDiv.style.visibility = 'hidden';
    buyGas.style.visibility = "hidden";
}
function playGame()
{
                
    multiplier = 0.01;
    if(nameField.value != "")
    {
        playerName = nameField.value.substr(0, 10);
    }
    difficulty = difficultySelection.value;
    if(difficulty==3)
    {
        money = 50;
    }
//    gasCanvas.style.visibility='visible';
    portraitGameImage.style.visibility = "visible";
    splashScreenPageDiv.style.visibility='hidden';
    mainMenuForm.style.visibility='hidden';
    answerSelection.style.visibility = 'visible';
    bigCanvas.style.visibility = 'visible';
    numericStats.style.visibility = 'visible';
    gasPercent=100;
    time=0;
    update();
    startTimer();
    askQuestion();
}

function carImageClicked()
{
    if(carSelection.value==1){
        carImage.src = "images/taxiImg.png";
        carSource = "images/taxi.png";
    }
    else if(carSelection.value==2){
        carImage.src = "images/truckImg.png";
        carSource = "images/truck.png";
    }
    else if(carSelection.value==3){
        carImage.src = "images/busImg.png";
        carSource = "images/bus.png";
    }
    else if(carSelection.value==4){
        carImage.src = "images/limoImg.png";
        carSource = "images/limo.png";
    }
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
    gameTick = window.setInterval(function(){requestAnimationFrame(tick)}, 40);
}
function changeGas()
{
    gasPercent-=gasChanger;
    if(gasChanger<0&&money>0)
    {
        gasAdded+=(gasChanger*-1);
        if(difficulty==1){money-=0.1;}
        else if(difficulty==2){money-=0.2}
        else{money-=0.3;}
        if(money<0){money=0;}
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
    if(canGetGas())
    {
        buyGas.style.visibility = "visible";
    }
    else
    {
        buyGas.style.visibility = "hidden";
    }
    if(gasPercent<0||((time/40).toFixed(0))>360)
    {
        clearInterval(gameTick);
        gasPercent=0;
        gameRunning=false;
//		time = 0;
    }
    if(gameRunning)
    {
        numberDiv.innerHTML = ("Temps: "+((time/40).toFixed(0))+"<br>Score: "+score.toFixed(0));
        moneyP.innerHTML = money.toFixed(2)+"$";
        
		changeLighting(((time/40).toFixed(0)));
		
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
    var temp1 = 0;
    var temp2 = 0;
    if(newPlace != 10)
    {
        for(var i = 0; i < 10 - newPlace; i++)
        {
            highScoreArray[(i-9)*-1] = highScoreArray[(i-8)*-1];
            highScoreArray[((i-9)*-1) + 10] = highScoreArray[((i-8)*-1) + 10];
        }
        highScoreArray[newPlace] = score.toFixed(0);
        highScoreArray[newPlace + 10] = playerName;
        updateHighScore();
    }
}

function updateHighScore()
{
    place1.innerHTML = highScoreArray[10] + " " + highScoreArray[0];
    place2.innerHTML = highScoreArray[11] + " " + highScoreArray[1];
    place3.innerHTML = highScoreArray[12] + " " + highScoreArray[2];
    place4.innerHTML = highScoreArray[13] + " " + highScoreArray[3];
    place5.innerHTML = highScoreArray[14] + " " + highScoreArray[4];
    place6.innerHTML = highScoreArray[15] + " " + highScoreArray[5];
    place7.innerHTML = highScoreArray[16] + " " + highScoreArray[6];
    place8.innerHTML = highScoreArray[17] + " " + highScoreArray[7];
    place9.innerHTML = highScoreArray[18] + " " + highScoreArray[8];
    place10.innerHTML = highScoreArray[19] + " " + highScoreArray[9];
}

function initializeQuestions()
{
    for(var i = 0; i < numHomophoneTypes; i++)
    {
        answerArray[i] = new Array();
        questionArray[i] = new Array();
        for(var j = 0; j < 10; j++)
        {
            questionArray[i][j] = new Array();
        }
    }
    //questionArray[homophone set][question number][true: question false: answer to question]
    //answerArray[homophone set][number of questions in that set (first value only) OR value for each homophone (other members in array)]
    var a = 0;
    var on = 1;
    var son = 2;
    var sa = 3;
    answerArray[a][0] = 10;
    answerArray[on][0] = 10;
    answerArray[son][0] = 10;
    answerArray[sa][0] = 10;     
    
    answerArray[a][1] = "a";
    answerArray[a][2] = "\xE0";
    answerArray[on][1] = "on";
    answerArray[on][2] = "ont";
    answerArray[son][1] = "son";
    answerArray[son][2] = "sont";
    answerArray[sa][1] = "sa";
    answerArray[sa][2] = "\xE7a";
    
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
    
    questionArray[a][5][true] = "Ta m&egravere a t&eacutel&eacutephon&eacute ___ plusieurs endroit.";
    questionArray[a][5][false] = 1;
    
    questionArray[a][6][true] = "Il n'y ___ pas d'&eacutepicerie i&ccedili.";
    questionArray[a][6][false] = 0;
    
    questionArray[a][7][true] = "Tu dois aller ___ Chertsey.";
    questionArray[a][7][false] = 1;
    
    questionArray[a][8][true] = "Elle ___ manqu&eacute son vol de retour.";
    questionArray[a][8][false] = 0;
    
    questionArray[a][9][true] = "Son chien a japp&eacute apr&egraves le chat d'___ c&ocirct&eacute.";
    questionArray[a][9][false] = 1;
    
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
    
    questionArray[on][5][true] = "Elles ___ mang&eacute trop de chocolat.";
    questionArray[on][5][false] = 1;
    
    questionArray[on][6][true] = "___ n'a rien fait pour les en emp&ecirccher.";
    questionArray[on][6][false] = 0;
    
    questionArray[on][7][true] = "Ils ___ tent&eacute de nous aider.";
    questionArray[on][7][false] = 1;
    
    questionArray[on][8][true] = "___ y va avec la famille et les amis.";
    questionArray[on][8][false] = 0;
    
    questionArray[on][9][true] = "Les skieurs ___ de plaisir avec cette nouvelle neige.";
    questionArray[on][9][false] = 1;         
                
    questionArray[son][0][true] = "Ce sont des g&acircteaux de ___ commerce.";
    questionArray[son][0][false] = 0;
    
    questionArray[son][1][true] = "Les livres ___ fabriqu&eacutes en Inde.";
    questionArray[son][1][false] = 1;
    
    questionArray[son][2][true] = "Il a retrouv&eacute ___ jouet.";
    questionArray[son][2][false] = 0;
    
    questionArray[son][3][true] = "Ces fleurs ___ comestibles.";
    questionArray[son][3][false] = 1;
    
    questionArray[son][4][true] = "Le sac &agrave dos de ___ ami est trol rempli!";
    questionArray[son][4][false] = 0;
    
    questionArray[son][5][true] = "___-ils toujours montr&eacutes sur son lit?";
    questionArray[son][5][false] = 1;
    
    questionArray[son][6][true] = "C'est donc ___ probl&egraveme &agrave elle.";
    questionArray[son][6][false] = 0;
    
    questionArray[son][7][true] = "Ces bottes ___ trop grandes.";
    questionArray[son][7][false] = 1;
    
    questionArray[son][8][true] = "Elle ne d&eacutepassera pas ___ budget.";
    questionArray[son][8][false] = 0;
    
    questionArray[son][9][true] = "Ce ___ ses pantalons, ils sont bleus.";
    questionArray[son][9][false] = 1;
    
                
                
                
                
    questionArray[sa][0][true] = "Jacob a d&eacutechir&eacute ___ chemise.";
    questionArray[sa][0][false] = 0;
    
    questionArray[sa][1][true] = "Il se promenait comme ___.";
    questionArray[sa][1][false] = 1;
    
    questionArray[sa][2][true] = "Camille aime se retrouver seule dans ___ chambre.";
    questionArray[sa][2][false] = 0;
    
    questionArray[sa][3][true] = "C'est ___ qui lui donne des id&eacutees.";
    questionArray[sa][3][false] = 1;
    
    questionArray[sa][4][true] = "C'est ___ soupe pr&eacutef&eacuter&eacutee.";
    questionArray[sa][4][false] = 0;
    
    questionArray[sa][5][true] = "___ alors!";
    questionArray[sa][5][false] = 1;
    
    questionArray[sa][6][true] = "Nicolas a fait r&eacuteparer ___ bicyclette.";
    questionArray[sa][6][false] = 0;
    
    questionArray[sa][7][true] = "Pouvez-vous me trancher un demi-kilo de ___?";
    questionArray[sa][7][false] = 1;
    
    questionArray[sa][8][true] = "Il a apport&eacute ___ boussole.";
    questionArray[sa][8][false] = 0;
    
    questionArray[sa][9][true] = "___ va bien!";
    questionArray[sa][9][false] = 1;
}





                
                
                
                









