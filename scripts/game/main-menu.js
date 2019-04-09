function showMainMenu(){
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.globalAlpha = 1.0;

    ctx.drawImage(menuImage,224,100,1600,850);

    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Main Menu", 820, 300);

    for(var i = 0; i < options.length; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2  - 150, height / 2 + 150 * i);        
    }
}

function mainMenuHandler(){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){
        case 13:
            if(currentOption == 0){
                mainMenuOn = false;
                document.onkeydown = null;
                document.onkeydown = levelKeyDownHandler;
            }else if(currentOption == 1){
                mainMenuOn = false;
                document.onkeydown = null;
                cancelAnimationFrame(drawing);
                showStartMenu();
            }
            break;      
        case 27:
            mainMenuOn = false;
            document.onkeydown = null;
            document.onkeydown = levelKeyDownHandler;
            break;
        case 38:
            if(currentOption > 0){
                currentOption--;
            }
            break;
        case 40:
            if(currentOption < options.length-1){
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