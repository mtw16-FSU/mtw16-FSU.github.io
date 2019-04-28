var subMenu = 0;
var currentMapOption = 0, mapColumnNumber = 0;

function showMainMenu(){
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.globalAlpha = 1.0;

    ctx.drawImage(menuImage,224,100,1600,850);
    
    switch(subMenu){
        case 0:
            showTopLevelMenu();
            break;
        case 1:
            showMapMenu();
            break;
        case 2:
            ctx.font = "64px Sniglet";
            ctx.fillStyle = "white";
            ctx.textAlign = "center"; 
            ctx.fillText("File saved successfully", width/2, height/2);   
            ctx.textAlign = "start";
            break;
        default:
            break;
    }
}

function showTopLevelMenu(){
    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Main Menu", 820, 260);
    
    ctx.font = "60px Sniglet";
    for(var i = 0; i < options.length; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2  - 150, (height / 2) - 90 + 100 * i);        
    }
}

function showMapMenu(){
    ctx.fillStyle = "white";
    ctx.font = "90px Sniglet";
    ctx.textAlign = "center"; 
    ctx.fillText("Choose Destination To Travel To", width/2, 260);
    ctx.textAlign = "start"; 
    
    ctx.font = "48px Sniglet";
    for(var i = 0; i < mapEntries.length; i++){
        if(i == currentMapOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(mapEntries[i], 350 + (mapColumnNumber*100), 350 + (i*70));        
    }
    
    ctx.fillStyle = "white";
    ctx.textAlign = "center"; 
    ctx.fillText("Press Esc to Go Back", width/2, height/2 + 350);   
    ctx.textAlign = "start"; 
}

function mainMenuHandler(){
    var keyCode = event.which || event.keyCode;
    
    switch(keyCode){
        case 13:
            if(currentOption == 0){
                mainMenuOn = false;
                document.onkeydown = null;
                document.onkeydown = levelHandler;
		document.onkeyup = levelHandler2;
                for ( i = 0; i < Enemies.length; i++ ) {
                    if ( Enemies[i].death == false )
                      Enemies[i].whichAction = "alive";
                }
            }
            else if ( currentOption == 1 ) {
                mainMenuOn = false;
                options = [];
                for ( i = 0; i < Player.inventory.length; i++) {
			      options.push(Player.inventory[i]);	
		}
		options.push("Exit");
                Player.initInventory();
            }
            else if(currentOption == 2){
                subMenu = 1;
                document.onkeydown = null;
                document.onkeydown = mapMenuHandler;
            }else if(currentOption == 3){
                saveGame();
                subMenu = 2;
                document.onkeydown = null;
                
                setTimeout(function(){
                    subMenu = 0;
                    document.onkeydown = mainMenuHandler;
                }, 1500);
                
                //alert("Game succesfully saved.");
            }else if(currentOption == (options.length-1)){
                mainMenuOn = false;
                document.onkeydown = null;
                cancelAnimationFrame(drawing);
                showStartMenu();
            }
            break;      
        case 27:
            mainMenuOn = false;
            document.onkeydown = null;
            document.onkeydown = levelHandler;
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


function mapMenuHandler(){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){
        case 13:
            if(sceneHandler.scene.name != mapEntries[currentMapOption]){
                subMenu = 0;
                document.onkeydown = null;
                sceneHandler.scene.getScene(mapEntries[currentMapOption]);
            }
            break;      
        case 27:            
            subMenu = 0;
            document.onkeydown = null;
            document.onkeydown = mainMenuHandler;
            break;
        case 38:
            if(currentMapOption > 0){
                currentMapOption--;
            }
            break;
        case 40:
            if(currentMapOption < mapEntries.length-1){
                currentMapOption++;
            }
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}
