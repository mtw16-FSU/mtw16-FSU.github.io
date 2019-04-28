//initializes the canvas as soon as the webpage loads
function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 2048;
    canvas.height = 1024;

    width = canvas.width;
    height = canvas.height;

    background = new Image();
    menuImage = new Image();
    background.src= "images/backgrounds/MenuBackground.png";
    menuImage.src = "images/menus/main_menu.png";
}

//starts game at start menu
function showStartMenu(){
    document.getElementById("title").innerHTML = "";
    document.onkeydown = checkMenuInput;
    
    currentOption = 0;
    background.src= "images/backgrounds/MenuBackground.png";
    
    drawing = requestAnimationFrame(drawStartMenu);
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

    //highlights whatever menu option the user has chosen in yellow
    for(var i = 0; i < size; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2  - 150, height / 2 + 150 * i);        
    }

    drawing = requestAnimationFrame(drawStartMenu);    
}

function checkMenuInput(event){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){
        case 13: //enter key, loads appropriate map/menu option
            if(currentOption == 0){
                cancelAnimationFrame(drawing);
                startTime = new Date();
                sceneHandler.scene.getScene(saveFiles[0].location);
            }else if(currentOption == 1){
                cancelAnimationFrame(drawing);
                sceneHandler.scene.getScene("Options");
            }else if(currentOption == 2){
                cancelAnimationFrame(drawing);
                sceneHandler.scene.getScene("Save Files");
            }
            break;
        case 38: //up, moves up the menu option list
            if(currentOption > 0){
                currentOption--;
            }
            break; //down, moves down the menu option list
        case 40:
            if(currentOption < size-1){
                currentOption++;
            }
            break;
        case 70: //f, toggles fullscreen
            toggleFullScreen();
            break;
        default:
            break;
        }
}

function stopGame(){
    document.onkeydown = null;
    cancelAnimationFrame(drawing);
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
        canvas.style.width = "800px";
        canvas.style.height = "auto";
        canvas.style.position = "relative";
        canvas.style.margin = "10px auto";
        canvas.style.border = "2px solid";
        isFullScreen = false;
        
        showFullScreenMessage(isFullScreen);
    }
}
