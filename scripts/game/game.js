var width, height;
var canvas, ctx;
var background;
var isFullScreen = false;
var sceneHandler = new SceneHandler(new Scene("", new Map("")));

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 2048;
    canvas.height = 1024;

    width = canvas.width;
    height = canvas.height;

    background = new Image();
    background.src= "images/backgrounds/MenuBackground.png";
}

var currentOption = 0, size;
function showStartMenu(){
    document.getElementById("title").innerHTML = "";
    document.onkeydown = checkMenuInput;
    
    drawing = setInterval(drawStartMenu, 1000/60);
}

function drawStartMenu(){
    options = ["Start Game", "Options", "Save Files"];
    size = options.length;

    var startMessage = "A Knight's Tale";

    ctx.clearRect(0,0,width,height);

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
        
    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = "black";
    ctx.font = "150px Sniglet";
    ctx.fillText(startMessage, width / 2 - 450, 200);
    
    ctx.font = "72px Sniglet";

    for(var i = 0; i < size; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2  - 150, height / 2 + 150 * i);        
    }

}

function checkMenuInput(event){
    switch(event.keyCode){
        case 13:
            if(currentOption == 0){
                clearInterval(drawing);
                sceneHandler.scene.getScene("Level 1");
            }else if(currentOption == 1){
                clearInterval(drawing);
                sceneHandler.scene.getScene("Options");
            }else if(currentOption == 2){
                clearInterval(drawing);
                sceneHandler.scene.getScene("Save Files");
            }
            break;
        case 38:
            if(currentOption > 0){
                currentOption--;
            }
            break;
        case 40:
            if(currentOption < size-1){
                currentOption++;
            }
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
        }
}

function stopGame(){
    document.onkeydown = null;
    clearInterval(drawing);
}

function toggleFullScreen(){
    if(!isFullScreen){
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.margin = "0";
        canvas.style.border = "none";

        isFullScreen = true;               
        showFullScreenMessage(isFullScreen);
    }else{
        canvas.style.width = "600px";
        canvas.style.height = "auto";
        canvas.style.position = "relative";
        canvas.style.margin = "10px auto";
        canvas.style.border = "2px solid";
        isFullScreen = false;
        
        showFullScreenMessage(isFullScreen);
    }
}

/*
setInterval(function(){
    ctx.clearRect(0,0,width,height);

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "red";
    ctx.fillText(startMessage, width / 2 - 450, height / 2);

    ctx.fillStyle = "green";
    ctx.fillRect(testSquareX, testSquareY, 100, 100);
    testSquareX += dx;

    if(testSquareX >= width - 100 || testSquareX <= 0){
        dx *= -1;
    }
}, 1000/60);*/