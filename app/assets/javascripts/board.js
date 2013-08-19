var canvas="";
var coords = [];
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
    drawBoard(5);//passing constant param for boardsize
    });
   drawBoard(5);//passing constant param for boardsize
/*sorts coordinates array based on y values.*/
   coords.sort(function(a,b){
       if(a.y==b.y) return a.x-b.x;
       else return a.y-b.y;
       });

   for(var i=0; i < coords.length; i++){
        var c = canvas.getContext('2d');
        c.font="bold 14px Times";
        c.fillStyle="#000";
        c.fillText(i,coords[i].x, coords[i].y);

    }

});

function drawBoard(totalRows){
    //all scaling relative to this:
    var hexSize = $("canvas#board").height()*(0.5/totalRows);//this is the length of a Hex edge
    //rows of 3, 4, 5, 4, 3 with random bg
    //row counter says how many hexes there should be on each row. 
    var rc = (totalRows+1)/2;
    var c = canvas.getContext('2d');
    var pastMid = false
    var xOffset = ($("canvas#board").width()*0.35);//initial board position
    var yOffset = ($("canvas#board").height()*0.1);
    c.save();//save translation state
    c.translate(xOffset, yOffset);//translate to initial board position
    for(var i=0; i<totalRows; i++){//5 rows. change this for larger boardsize
        for(var k=0; k<rc; k++){
                
            drawHex((hexSize*cos30*k*2),0, xOffset, yOffset, hexSize);

        }
        //for row translations:
        if(rc<totalRows && pastMid===false){//rows expanding /***\
            c.translate(-(hexSize*cos30),hexSize*1.5);
            xOffset-=hexSize*cos30;
            yOffset+=hexSize*1.5;
            rc++;//row count increasing
        }
        else{//rows contracting \__/
            pastMid = true;
            c.translate((hexSize*cos30),hexSize*1.5);
            xOffset+=hexSize*cos30;
            yOffset+=hexSize*1.5;
            rc--;//row count decreasing
        }
    }
    c.restore();//reset translation
}


/* params:
size is hex edge length
x,y are translation (always horizontal)
from initial translation position (see function drawBoard()) */
function drawHex(x,y, xOffset, yOffset, size){
    var c = canvas.getContext('2d');
    // var cos30=(Math.sqrt(3)/2); //now global var
    var vx, vy;//vertices to store in array;
    c.save();
    c.translate(x,y);
    
    c.beginPath();//draw the hexes
    vx=0; vy=0;//point 1
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    
    vx = cos30*size; vy = -0.50*size;//point 2
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);

    vx = cos30*size*2; vy = 0;//point 3
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);

    vx = cos30*size*2; vy = size;//point 4
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    
    vx = cos30*size; vy = size*1.50;//point 5 
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    
    vx = 0; vy = size;//point 6
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    

    c.closePath();
    c.lineWidth=2;
    c.stroke();
    // var img=new Image();
    // img.src=setResourceType();
    // var resourceType=c.createPattern(img, "repeat");
    c.fillStyle="#fff";//need random resource bg here
    c.fill();
    c.restore();
}
function setResourceType(){    
    var type=Math.floor(Math.random()*5)+1; //5 types of resources
    if(type==1){
        return 
    }
}

function storeCoordinate(xVal, yVal, array) {
    xVal=Math.round(xVal * 1000)/1000;
    yVal=Math.round(yVal * 1000)/1000;
    for(var i=0; i < array.length; i++){
        if(array[i].x==xVal && array[i].y==yVal){
            return;
        }
    }
    array.push({x: xVal, y: yVal});
}
