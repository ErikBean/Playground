
var c = "";


function drawDice(diceSize) {

	drawSquare(diceSize); //replaced old way so stroke is enabled
    var dotSpot=diceSize*0.266;
    var dotSize = Math.floor(diceSize/12)+1;
    // alert(dotSize);
	//draw dots
	var n = Math.floor(Math.random()*6)+1; //1-6 dots
	c.fillStyle = "black";
	if (n == 1) {
		drawDot(0,0, dotSize);
	} else if (n == 2) {
		drawDot(dotSpot,dotSpot, dotSize);
		drawDot(-dotSpot,-dotSpot, dotSize);
	} else if (n == 3) {
		drawDot(0,0, dotSize);
		drawDot(dotSpot,dotSpot, dotSize);
		drawDot(-dotSpot,-dotSpot, dotSize);
	} else if (n == 4) {
		drawDot(dotSpot,dotSpot, dotSize);
		drawDot(-dotSpot,-dotSpot, dotSize);
		drawDot(-dotSpot,dotSpot, dotSize);
		drawDot(dotSpot,-dotSpot, dotSize);
	} else if (n == 5) {
		drawDot(0,0, dotSize);
		drawDot(dotSpot,dotSpot, dotSize);
		drawDot(-dotSpot,-dotSpot, dotSize);
		drawDot(-dotSpot,dotSpot, dotSize);
		drawDot(dotSpot,-dotSpot, dotSize);
	} else { //6
		drawDot(dotSpot,dotSpot, dotSize);
		drawDot(-dotSpot,-dotSpot, dotSize);
		drawDot(-dotSpot,dotSpot, dotSize);
		drawDot(dotSpot,-dotSpot, dotSize);
		drawDot(dotSpot,0, dotSize);
		drawDot(-dotSpot,0, dotSize);
	}
    
    return n;//number rolled
}

function drawDot(x,y,dotSize) {
	c.beginPath();
    var n=dotSize;
	c.arc(x,y,n,0,Math.PI*2,true);
	c.closePath();
	c.fill();
}

function drawSquare(diceSize) {
    //dice are 60 x 60
    c.save();
	c.strokeStyle = "#000";
    c.lineWidth=3;
	c.fillStyle = "rgba(250,250,250,1.0)"; //white
    c.shadowBlur=15;
    c.shadowColor="black";

	c.beginPath();
    var halfSize=diceSize/2;
	c.moveTo(-halfSize, -halfSize);
	c.lineTo(halfSize,-halfSize);
	c.lineTo(halfSize,halfSize);
	c.lineTo(-halfSize,halfSize);
	c.lineTo(-halfSize,-halfSize);
	c.closePath();
	c.stroke();
	c.fill();
    c.restore();
}

function roll() {
    var canvas = document.getElementById("board");
    c = canvas.getContext("2d");
    var cHeight = $("canvas#board").height();
    var cWidth = $("canvas#board").width();
    var diceSize = cHeight/10;
    var num=0;
	c.clearRect(0, (cHeight/1.1)-(diceSize/2)-15,(cWidth/6)+diceSize, cHeight); //clears previous dice
    c.stroke();
    c.save();
    c.translate((cWidth/20), (cHeight/1.1));
    num+=drawDice(diceSize);
    c.translate(diceSize*1.3, 0);
    num+=drawDice(diceSize);
	c.restore();
    return num;
} // end draw()
