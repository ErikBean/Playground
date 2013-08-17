var canvas="";
var num=0;//number on dice
var cos30=(Math.sqrt(3)/2);//used for hexagons a lot
$(document).ready(function(){
    canvas = document.getElementById("board");//init canvas var here
    //make canvas approx size of window
    canvas.height=$(window).height()*0.85;
    canvas.width=$(window).width()*0.95;//stroke=2%
    $(window).resize(function(){//also on resize. 
    //PROBLEM WITH REDRAWING CANVAS ELEMENTS
    canvas.height=$(window).height()*0.85;
    canvas.width=$(window).width()*0.95;//stroke=2%
        drawBoard(19);//passing constant param for boardsize
    });
   drawBoard(19);//passing constant param for boardsize
    // $( "button#roll" ).click(function() {   
    //     num=roll();//in dice.js
    // });    
});
function drawBoard(numTiles){
    var hexSize = $("canvas#board").height()*0.1;
    //rows of 3, 4, 5, 4, 3 with random bg
    var rc = 3;//row counter says how many hexes there should be on each row
    var totalRows = 5;
    var c = canvas.getContext('2d');
    var pastMid = false
    c.save();//save translation state
    for(var i=0; i<totalRows; i++){//5 rows. change this for larger boardsize
        for(var k=0; k<rc; k++){
                
            drawHex((hexSize*cos30*k*2)+($("canvas#board").width()*0.35),50,hexSize);

        }
        if(rc<5 && pastMid===false){
            c.translate(-(hexSize*cos30),hexSize*1.5)
            rc++;
        }
        else{
            pastMid = true;
            c.translate((hexSize*cos30),hexSize*1.5)
            rc--;
        }
    }
    c.restore();//reset translation

}
function drawHex(x,y, size){
    var c = canvas.getContext('2d');
    // var cos30=(Math.sqrt(3)/2);
    
    c.save();
    c.translate(x,y);
    c.beginPath();
    c.lineTo(0, 0);
    c.lineTo(cos30*size, -0.50*size);
    c.lineTo(cos30*size*2, 0);
    c.lineTo(cos30*size*2, size);
    c.lineTo(cos30*size,size*1.50);
    c.lineTo(0 ,size);
    c.closePath();
    c.lineWidth=2;
    c.stroke();
    c.fillStyle='rgba(0,255,0,0.3)';
    c.fill();
    c.restore();
}