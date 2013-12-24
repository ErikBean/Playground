var canvas="";
var coords = [];//all the vertices, sorted. has fields x,y,
var hexes = [];/*all the hexes, sorted. has fields a-f representing
vertices that are in coords[]
This has overlaps, coords does not
int field for settlement=1 port=2-7 city=8
port# indicates resource type 2:1 or 3:1*/
var size = 5;
var num=0;//number on dice
var COS30=(Math.sqrt(3)/2);//CONSTANT for hexagons a lot
$(document).ready(function(){
    canvas = document.getElementById("board");//init canvas var here
    //make canvas approx size of window
    canvas.height=$(window).height()*0.85;
    canvas.width=$(window).width()*0.95;//stroke=2%
   drawBoard(size);//passing constant param for boardsize (for now)
/*sorts coordinates array based on y values.*/
   coords.sort(function(a,b){
       if(a.y==b.y) return a.x-b.x;
       else return a.y-b.y;
       });

//   for(var i=0; i < coords.length; i++){
//         var c = canvas.getContext('2d');
//         c.font="bold 14px Times";
//         c.fillStyle="#000";
//         c.fillText(i,coords[i].x, coords[i].y);

//     }
    for(var i=18;i<19;i++){
        var c = canvas.getContext('2d');
        c.font="bold 14px Times";
        c.fillStyle="#000";
        c.fillText(i,hexes[i].a.x, hexes[i].a.y);
        c.fillText(i,hexes[i].b.x, hexes[i].b.y);
        c.fillText(i,hexes[i].c.x, hexes[i].c.y);
        c.fillText(i,hexes[i].d.x, hexes[i].d.y);
        c.fillText(i,hexes[i].e.x, hexes[i].e.y);
        c.fillText(i,hexes[i].f.x, hexes[i].f.y);
    }

});
$(window).resize(function(){//also on resize. 
    //PROBLEM WITH REDRAWING CANVAS ELEMENTS
    canvas.height=$(window).height()*0.85;
    canvas.width=$(window).width()*0.95;//stroke=2%
    drawBoard(size);//passing constant param for boardsize
});

function drawBoard(totalRows){//shouldn't set resources, because called on window resize
    //all scaling relative to this:
    var hexSize = $("canvas#board").height()*(0.5/totalRows);//this is the length of a Hex edge
    //rows of 3, 4, 5, 4, 3 with random bg
    //row counter says how many hexes there should be on each row. 
    var rc = (totalRows+1)/2;
    var c = canvas.getContext('2d');
    var pastMid = false
    var xOffset = ($("canvas#board").width()*0.35);//initial board position
    var yOffset = ($("canvas#board").height()*0.1);
    var hNum = 0;//number of hexes total, count up while drawing
    c.save();//save translation state
    c.translate(xOffset, yOffset);//translate to initial board position
    for(var i=0; i<totalRows; i++){//5 rows. change this for larger boardsize
        for(var k=0; k<rc; k++){
                
            drawHex((hexSize*COS30*k*2),0, xOffset, yOffset, hexSize, hNum);
            hNum++;

        }
        //for row translations:
        if(rc<totalRows && pastMid===false){//rows expanding /***\
            c.translate(-(hexSize*COS30),hexSize*1.5);
            xOffset-=hexSize*COS30;
            yOffset+=hexSize*1.5;
            rc++;//row count increasing
        }
        else{//rows contracting \__/
            pastMid = true;
            c.translate((hexSize*COS30),hexSize*1.5);
            xOffset+=hexSize*COS30;
            yOffset+=hexSize*1.5;
            rc--;//row count decreasing
        }
    }
    c.restore();//reset translation
}


/* params:
size is hex edge length
x,y are translation (always horizontal)
hNum is the number of the hex we're drawing
from initial translation position (see function drawBoard()) */
function drawHex(x,y, xOffset, yOffset, size, hNum){
    var c = canvas.getContext('2d');
    var points=[];
    // var cos30=(Math.sqrt(3)/2); //now global var
    var vx, vy;//vertices to store in array;
    c.save();
    c.translate(x,y);
    
    c.beginPath();//draw the hexes
    vx=0; vy=0;//point 1
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    points.push({x: vx+x+xOffset, y:vy+y+yOffset});

    vx = COS30*size; vy = -0.50*size;//point 2
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    points.push({x: vx+x+xOffset, y:vy+y+yOffset});


    vx = COS30*size*2; vy = 0;//point 3
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    points.push({x: vx+x+xOffset, y:vy+y+yOffset});
    

    vx = COS30*size*2; vy = size;//point 4
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    points.push({x: vx+x+xOffset, y:vy+y+yOffset});

    
    vx = COS30*size; vy = size*1.50;//point 5 
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    points.push({x: vx+x+xOffset, y:vy+y+yOffset});

    
    vx = 0; vy = size;//point 6
    c.lineTo(vx, vy);
    storeCoordinate(vx+x+xOffset, vy+y+yOffset, coords);
    points.push({x: vx+x+xOffset, y:vy+y+yOffset});
    //push last 6 x,y pairs from points onto hexes array
    hexes.push({a:points.shift(), b:points.shift(), c:points.shift(), d:points.shift(), e:points.shift(), f:points.shift()});
    
    
    //actually draw hex lines
    c.closePath();
    c.lineWidth=2;
    c.stroke();
    
    
    // c.fillStyle = setResourceImage();
    // c.fill();
    c.restore();
}
function setResourceImage(n){   //lets use textures rather than solid colors at some point, param is resource num
    var c=canvas.getContext('2d');
    var img=new Image();
    var type=Math.floor(Math.random()*5)+1; //NOOOO
    if(type==1){//sheep
        img.src="/assets/sheep2.jpg";
    }
    else if(type==2){//wheat
        img.src="/assets/wheat1.jpg";
    }
    else if(type==3){//wood
        img.src="/assets/wood3.jpg";
    }
    else if(type==4){//brick
        img.src="/assets/brick2.jpg";
    }
    else if(type==5){//ore
        img.src="/assets/ore1.jpg";
    }

    var resourceType = c.createPattern(img, "repeat");
    return resourceType;
}
function setResourceColor(type){
        if(type==1){//sheep
        return "#fff";//sheep
    }
    else if(type==2){//wheat
        return "#ff0";//yellow
    }
    else if(type==3){//wood
      return "#993300";//brown
    }
    else if(type==4){//brick
        return "#f00";//red
    }
    else if(type==5){//ore
        return "#fff";
    }
}
function storeCoordinate(xVal, yVal, array) {
    xVal=Math.round(xVal * 1000)/1000;
    yVal=Math.round(yVal * 1000)/1000;
    for(var i=0; i < array.length; i++){
        if(array[i].x==xVal && array[i].y==yVal){//point overlaps prev point
            return;
        }
    }
    array.push({x: xVal, y: yVal});
}
