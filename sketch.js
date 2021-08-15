var ball,database, position;

function setup(){

   
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database= firebase.database();
    var ballPosition= database.ref("ball/position");
    ballPosition.on("value",positionReading,showError);
    
}

function positionReading(data){
  position=data.val();
  ball.x=position.x;
  ball.y=position.y;
}
function showError(){
  console.log("There is a error in database");
}


function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
    
    drawSprites();
}

function changePosition(x,y){
    // ball.x = ball.x + x;
    // ball.y = ball.y + y;
    var ballPosition= database.ref("ball/position");
    ballPosition.set({
        "x": position.x+x,
        "y": position.y+y,
    });
}
