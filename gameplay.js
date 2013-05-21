var gameTick; var hasPassenger = false;
var dodge = false;
var taxiX = 544, dodgeCounter = 0;
var y = 0, buildingy = -324, buildingy2 = 316, buildingy3 = -4; var passengery1=0;
var obstructiony = 700;
var buildingArray = new Array(); var passengerArray = new Array(); var pedestrianArray = new Array();
var obstructionImage = new Image();
var numPassengers = 10;

function render(){
    var canvas = document.getElementById("bigCanvas");
    var g=canvas.getContext("2d");
	g.clearRect(0, 0, canvas.width, canvas.height);
	roadScroll();
	taxi();
	buildingSpawn();
    passengerSpawn();
	if(!hasPassenger){
			
	}
//	pedestrianWalk();
	
}

function taxi(){
	var canvas = document.getElementById("bigCanvas");
    var g=canvas.getContext("2d");
    var taxiImage = new Image();
    taxiImage.src = "images/taxi.png";
    g.drawImage(taxiImage, taxiX, 410);
//	g.fillStyle = "#ffff00";
//  g.fillRect(taxiX, 410, 64, 128);	
}

function setHasPassenger(temp){
	hasPassenger = temp;
}
function sendObstruction(wasRight)
{
    if(wasRight)
    {
        dodge = true;
    }
    dodgeCounter=0;
    obstructionImage.src = "images/Obstruction"+Math.floor(Math.random()*2)+".png";
    obstructiony=-50;
}

function enviroment(){
	var canvas = document.getElementById("bigCanvas");
    var g=canvas.getContext("2d");
	var roadImg;
	var sidewalkImg;
	var grassImg;
	
    taxi();
//grass image
	grassImg = new Image();
	grassImg.src = "images/grasshizzle.png";
	g.drawImage(grassImg, 0, y);
	g.drawImage(grassImg, 0, y - 640);
	
//road image
	roadImg = new Image();
	roadImg.src = "images/road.png";
	g.drawImage(roadImg, 384, y);
	g.drawImage(roadImg, 384, y - 640);
	
//sidewalk image	
	sidewalkImg = new Image();
	sidewalkImg.src = "images/sidewalk.png";
	g.drawImage(sidewalkImg, 288, y);
	g.drawImage(sidewalkImg, 640, y);
	g.drawImage(sidewalkImg, 288, y - 640);
	g.drawImage(sidewalkImg, 640, y - 640);
    
    // Obstruction Image
    g.drawImage(obstructionImage, 551, obstructiony);
}

function roadScroll(){
	enviroment();
	if(obstructiony<700)
    {
        obstructiony+=4;
    }
    if(dodge)
    {
        if(taxiX > 514)
        {
            taxiX-=1;
        }
        else if(taxiX > 480)
        {
            taxiX-=1.5;
        }
        else if(taxiX > 450)
        {
            taxiX-=1;
        }
        else
        {
            dodge = false;
        }
    }
    else if(taxiX < 544)
    {
        if(dodgeCounter<40)
        {
            dodgeCounter++;
        }
        else
        {
            taxiX+=1;
            if(taxiX > 480 && taxiX < 514)
            {
                taxiX+=0.5;
            }
        }
    }
    
	y+=4;
	if(y == 640){
		y = 0;
		enviroment();
	}
	buildingy+=4;
    buildingy2+=4;
    buildingy3+=4;
    if(buildingy==640){
        buildingy=-320;
        buildingArray[0].src = getBuildingSrc();
        buildingArray[1].src = getBuildingSrc();
    }
    if(buildingy2==640){
        buildingy2=-320;
        buildingArray[2].src = getBuildingSrc();
        buildingArray[3].src = getBuildingSrc();
    }
    if(buildingy3==640){
        buildingy3=-320;
        buildingArray[4].src = getBuildingSrc();
        buildingArray[5].src = getBuildingSrc();
    }
    for(var i = 0; i<numPassengers; i++){
        passengerArray[i][1] += 4 + passengerArray[i][3];
        if(passengerArray[i][1]>=640){
            passengerArray[i][3] = Math.floor(Math.random() * 3 - 1);
            if(Math.floor(Math.random()*2)==0)
            {
                passengerArray[i][2] = Math.floor(Math.random() * 64 + 640);
            }
            else
            {
                passengerArray[i][2]=Math.floor(Math.random()*64+288);
            }
            passengerArray[i][1]=(Math.floor(Math.random()*-500 - 50));//(Math.floor(Math.random()*-64));
            passengerArray[i][0].src = getPassengerSrc();
        }
    }
}

function passengerSpawn(){
	var canvas = document.getElementById("bigCanvas");
    var g=canvas.getContext("2d");
    for(var j = 0; j < numPassengers; j++){
        g.drawImage(passengerArray[j][0], passengerArray[j][2], passengerArray[j][1]);
    }
    x = 0;
	
}
function getPassengerSrc(){
	return "images/person" + Math.floor(Math.random() * 6 + 1) + ".png";
	
}
function pedestrianSpawn(){
	
}
function getPedestrianSrc(){
	
}

function buildingSpawn(){
	
	var canvas = document.getElementById("bigCanvas");
    var g=canvas.getContext("2d");
	var x = 0;
    for(var j = 0; j < 2; j++){
		if(buildingArray[j].src.indexOf("images/building6.png") != -1 && x == 800){
        	g.drawImage(buildingArray[j], 640, buildingy);}
		else{g.drawImage(buildingArray[j], x, buildingy);}
        x=800;
    }
    x = 0;
    for(var j = 0; j < 2; j++){
        if(buildingArray[j + 2].src.indexOf("images/building6.png") != -1 && x == 800){
        	g.drawImage(buildingArray[j+2], 640, buildingy2);}
		else{g.drawImage(buildingArray[j+2], x, buildingy2);}
        x=800;
    }
    x = 0;
    for(var j = 0; j < 2; j++){
        if(buildingArray[j + 4].src.indexOf("images/building6.png") != -1 && x == 800){
        	g.drawImage(buildingArray[j+4], 640, buildingy3);}
		else{g.drawImage(buildingArray[j+4], x, buildingy3);}
        x=800;
    }


}

function getBuildingSrc(){
//	if(Math.floor(Math.random()*9) != 0){
		return "images/building"+(Math.floor(Math.random()*8)+1)+".png";
//	}
//	else{
//		return "";
////		alert("empty picture");
//	}
}

function buildingScroll(){
	
}
//function pedestrianWalk(){
//	var onStreet 
//	pedestrian(Math.floor(Math.random()*30), (Math.floor(Math.random()*64)+320));
//	y+=5;
//	
//}
//
//function pedestrian(n, m){
//	var canvas = document.getElementById("bigCanvas");
//	var g=canvas.getContext("2d");
//	
//	blackhair = new Image();
//	blackhair.src = "images/PersonTestHair.png";
//	brownhair = new Image();
//	brownhair.src = "images/PersonTestHair.png";
//	blondehair = new Image();
//	blondehair.src = "images/PersonTestHair.png";
//	redhair = new Image();
//	redhair.src = "images/PersonTestHair.png";
//	grayhair = new Image();
//	grayhair.src = "images/PersonTestHair.png";
//
//	if(n == 0){
//		g.drawImage(blackhair, m, 0);
//	}
//	else if(n == 3){
//		g.drawImage(brownhair, m, 0);
//	}
//	else if(n == 7){
//		g.drawImage(blondehair, m, 0);
//	}
//	else if(n == 11){
//		g.drawImage(redhair, m, 0);
//	}
//	else if(n == 15){
//		g.drawImage(grayhair, m, 0);
//	}
//}

function startTimerTy(){
	for(var i = 0; i < 6; i++){
		buildingArray[i] = new Image();
		buildingArray[i].src = getBuildingSrc();
	}
    
    for(var i = 0; i < numPassengers; i++){
        passengerArray[i] = new Array();
		passengerArray[i][0] = new Image();
		passengerArray[i][0].src = getPassengerSrc();
        passengerArray[i][1] = Math.floor(Math.random() * -700 - 50);
        passengerArray[i][3] = Math.floor(Math.random() * 3 - 1);
        if(Math.floor(Math.random()*2)==0)
        {
            passengerArray[i][2] = Math.floor(Math.random() * 64 + 640);
        }
        else
        {
            passengerArray[i][2]=Math.floor(Math.random()*64+288);
        }
	}

		gameTick = window.setInterval(function(){render()}, 10);
}
