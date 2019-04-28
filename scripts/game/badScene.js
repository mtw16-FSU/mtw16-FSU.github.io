//handles switching between different scenes and drawing from the scene that is loaded in
function SceneHandler(scene){
    this.scene = scene,
    this.drawScene = function(){
        scene.draw();
        drawing = requestAnimationFrame(sceneHandler.drawScene);
	    
	//ends game if the player is dead
	if(Player.death){
		Player.death = false;
		cancelAnimationFrame(drawing);
            	showStartMenu();
	}
    },
    this.loadScene = function(){
   	if(isSpreadsheetLoaded && isImage1Loaded && isImage2Loaded && isImage3Loaded){
	   isImage1Loaded = false;
	   isImage2Loaded = false;
	   isImage3Loaded = false;
	   isSpreadsheetLoaded = false;
	   
	   var tiles1 = [];
           var tiles2 = [];   

	   //creates temporary canvas to draw the map file on so its
	   //pixel data can be extracted to draw the map
           var canvas = document.createElement('canvas');

	   //draws image to hidden canvas
           canvas.width = image1.width;
           canvas.height = image1.height;
           canvas.getContext('2d').drawImage(image1,0,0,image1.width,image1.height);

	   //gets the pixel data of the map file represented as an array where every 4 indexes
	   //represent the Red, Green, Blue, and Alpha values of a pixel respectively
	   var pixelData = canvas.getContext('2d').getImageData(0,0,image1.width,image1.height).data;

	   //goes through the pixel array and converts it to a 2d array where each
	   //entry represents a type of tile that will be drawn to the screen
	   for(var i = 0; i < image1.height; i++){
       		    var row = i * image1.width * 4;
		    var backTiles = [];
                    for(var j = 0; j < image1.width*4; j += 4){
                        //backTiles.push([pixelData[row+j+1],y=pixelData[row+j+2]]);
			backTiles.push(new Tile(pixelData[row+j+1],pixelData[row+j+2], false));
                    }
                    tiles1.push(backTiles);
            }

           scene.map.backgroundTiles = tiles1;
           scene.map.rowSize = image1.height;
           scene.map.colSize = image1.width;
		
	   canvas.getContext('2d').clearRect(0,0,image1.width,image1.height);
		
	   canvas.getContext('2d').drawImage(image2,0,0,image1.width,image1.height);
           pixelData = canvas.getContext('2d').getImageData(0,0,image2.width,image2.height).data;
           for(var i = 0; i < image2.height; i++){
               var row = i * image2.width * 4;
               var foreTiles = [];
               for(var j = 0; j < image2.width*4; j += 4){
		       
		   var tile = new Tile(pixelData[row+j+1],pixelData[row+j+2], true);
		   tile.startX = ((j/4)*64)-10;
		   tile.startY = (i*64)-10;
		   tile.endX = (((j/4)+1)*64+10);
		   tile.endY = ((i+1)*64)+10;
		   foreTiles.push(tile);
		    
		   if(pixelData[row+j+1] == 0 && pixelData[row+j+2] == 0){
		   	tile.empty = true;   
		   }
		       
		   if((pixelData[row+j+1] == 0 && pixelData[row+j+2] == 176) ||
		     	(pixelData[row+j+1] == 16 && pixelData[row+j+2] == 176) ||
		     	(pixelData[row+j+1] == 255 && pixelData[row+j+2] == 255) ){
			  	if(i < 5){
					tile.side = 1;
				}else if (j < 5){					
					tile.side = 2;
				}else if(i > (image2.height - 5)){
					tile.side = 3;
				}else if(j > (image2.width - 5)){
					tile.side = 4;
				}
			bounds.push(tile);	
		   }
               }
               tiles2.push(foreTiles);
           }
     
           scene.map.foregroundTiles = tiles2;
		
		
	   //boundary tiles
	   canvas.getContext('2d').clearRect(0,0,image1.width,image1.height);
	   canvas.getContext('2d').drawImage(image3,0,0,image3.width,image3.height);
           pixelData = canvas.getContext('2d').getImageData(0,0,image3.width,image3.height).data;
           for(var i = 0; i < image3.height; i++){
               var row = i * image3.width * 4;
               var foreTiles = [];
               for(var j = 0; j < image3.width*4; j += 4){
		       
		   var tile = new Tile(pixelData[row+j+1],pixelData[row+j+2], true);
		   tile.startX = ((j/4)*64)+5;
		   tile.startY = (i*64)+5;
		   tile.endX = (((j/4)+1)*64)-5;
		   tile.endY = ((i+1)*64)-5;
		   tile.solid = true;
		       
		   if((pixelData[row+j+1] == 127 && pixelData[row+j+2] == 136)){
			//bounds.push(tile);
			bounds.push(new initVillager({
				X: tile.startX,
				Y: tile.startY,
				sentence: "Walls have ears"
				}));
				    Villagers.push(new initVillager({
				X: tile.startX,
				Y: tile.startY,
				sentence: "Walls have ears"
				}));
			   console.log("Start X: " + tile.startX + " Start Y: " + tile.startY);
		   }
               }
               tiles2.push(foreTiles);
           }
		
	   //----------------------------------------
	  
	   cancelAnimationFrame(drawing);
			
           drawing = requestAnimationFrame(sceneHandler.drawScene);
	}else{    
        	drawing = requestAnimationFrame(sceneHandler.loadScene);
	}
    }
}

//handles loading maps and the logic for them
function Scene(name, map){
    this.map = map,
    this.name = name,
    this.nextMaps = [-1,-1,-1,-1],
    this.getScene = function(name){
        this.name = name;
        this.map.name = name;
	    
	//removes any keyboard input handler that is currently active
        document.onkeydown = null;
        
        var isLevel = true;
        image1 = new Image();
        image2 = new Image();
        image3 = new Image();
	    
	bounds = [];
	Enemies = [];
	Villagers = [];
	    
        dx = 0;
        dy = 0;
	    
    	drawLoadingScreen();
        
        switch(this.name){
            case "Level 1":
		loadLevel1(sideOfScreen);		
                break;
	    case "Village":
		addMapEntry("Village");
		loadLevel2(sideOfScreen);		
		break;
	case "Castle":
		addMapEntry("Castle");
		loadCastle(sideOfScreen);		
		break;
            case "Options":
                initOptions();
                document.onkeydown = optionsHandler;
                isLevel = false;
		drawing = requestAnimationFrame(sceneHandler.drawScene);
                break;
            case "Save Files":
                initSaveFile();
                document.onkeydown = saveFileHandler;
                isLevel = false;
		drawing = requestAnimationFrame(sceneHandler.drawScene);
                break;
            default:
                break;
        }

	sideOfScreen = -1;
	    
        if(isLevel){
            
	    image1.onload = function(){		    
		isImage1Loaded = true;
            }

	    //repeats the same process for loading information about the foreground tiles
            image2.onload = function(){
	    	isImage2Loaded = true;
	    }
            
	    image3.onload = function(){
	    	isImage3Loaded = true;
	    }
		
            //sets default values for the level
            mainMenuOn = false;
            left = false;
            up = false;
            right = false;
            down = false;
            pLeft = false;
            pRight = false;
            pDown = false;
            pUp = false;
        }
        
	//begins game loop
	drawing = requestAnimationFrame(sceneHandler.loadScene);
        //drawing = requestAnimationFrame(sceneHandler.drawScene);
    },
    this.draw = function(){
        map.draw();
    }
}

function Map(name){
    this.name = name,
    this.foregroundTiles = [],
    this.backgroundTiles = [],
    this.boundaryTiles = [],
    this.rowSize = 0,
    this.colSize = 0,
    this.image = new Image(),
    this.draw = function(){
        switch(this.name){
            case "Level 1":
	    case "Village":
	    case "Castle":
                drawLevel(this, this.backgroundTiles,this.foregroundTiles, this.rowSize, this.colSize);
		
		//only draws player and updates player logic if the pause menu is not toggled
		if(!mainMenuOn){
			Player.moveCheck(pUp,pDown,pLeft,pRight,width,height);
			Player.draw();
			for ( i = 0; i < Enemies.length; i++ )
				Player.collisionCheck(Enemies[i]);
			for ( i = 0; i < Enemies.length; i++ )
				Enemies[i].draw();
			for ( i = 0; i < Villagers.length; i++ ) {
				Villagers[i].draw();
				if ( Villagers[i].drawText == true && printText >= 0)
					drawTextBox(Villagers[i].sentence,printText);
				else if ( Villagers[i].drawText == true )
					drawIMenu();
			}		
		
			var hit = generalCollision();
			if((hit[0] - 2) == 1 && sceneHandler.scene.nextMaps[0] != -1){
				cancelAnimationFrame(drawing);
                		sceneHandler.scene.getScene(sceneHandler.scene.nextMaps[0]);
			}else if((hit[0] - 2) == 2 && sceneHandler.scene.nextMaps[1] != -1){
				cancelAnimationFrame(drawing);
                		sceneHandler.scene.getScene(sceneHandler.scene.nextMaps[1]);
			}else if((hit[0] - 2) == 3 && sceneHandler.scene.nextMaps[2] != -1){
				cancelAnimationFrame(drawing);
                		sceneHandler.scene.getScene(sceneHandler.scene.nextMaps[2]);
			}else if((hit[0] - 2) == 4 && sceneHandler.scene.nextMaps[3] != -1){
				cancelAnimationFrame(drawing);
                		sceneHandler.scene.getScene(sceneHandler.scene.nextMaps[3]);
			}
		}	
                break;
            case "Options":
                drawOptionsScreen();
                break;
            case "Save Files":
                drawSaveFileScreen();
                break;
            default:
		//draws error screen if invalid map name is entered
                ctx.fillStyle = "blue";
                ctx.fillRect(0,0,width,height);
                break;
        }
    },
    this.getMap = function(sheetName){
        this.image.src = sheetName;
	this.image.onload = function(){
	     isSpreadsheetLoaded = true;
	};
    }
}

function drawLevel(map, backgroundTiles, foregroundTiles, rowSize, colSize){
    ctx.clearRect(0,0,width,height);
    drawLoadingScreen();
    
    //moves the player through the map until the left edge is reached
    if ( pLeft ) 
	    moveMap(37);
    if(((dx/8)+0.25)*64 > 0 || Player.X > 1024){
    	left = false;
    }

    //moves the player through the map until the right edge is reached
    if ( pRight )
	    moveMap(39);
    if(((colSize-1+(dx/8))+0.75)*64 < width || Player.X < 1024){
    	right = false;
    }

    //moves the player through the map until the up edge is reached
    if ( pUp )
	    moveMap(38);
    if(((dy/8)+0.25)*64 > 0 || Player.Y > 512){
    	up = false;
    }

    //moves the player through the map until the down edge is reached
    if ( pDown )
	    moveMap(40);
    if(((rowSize-1+(dy/8))+0.75)*64 < height || Player.Y < 512){
    	down = false;
    }
	
    if ( Player.whichAction == "attack" || Player.whichAction == "listen" ) {
	left = false;
	right = false;
	up = false;
	down = false;
    }
	
    //moves map to the left if left arrow key is pressed
    if(left){
	dx++;
    }

    //moves map to the right if right arrow key is pressed
    if(right){
	dx--;
    }
	
    //moves map to the up if up arrow key is pressed
    if(up){
	dy++;
    }
	
    //moves map to the down if down arrow key is pressed
    if(down){
	dy--;
    }
	
    var xPos = 0, yPos = 0; 
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < colSize; j++){
		
	    //gets the image to be cropped from the spritesheet to be displayed for the current tile
	    xPos = Math.ceil(backgroundTiles[i][j].X / 16);
            yPos = Math.ceil(backgroundTiles[i][j].Y / 16);
            
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
		
	    xPos = Math.ceil(foregroundTiles[i][j].X / 16);
            yPos = Math.ceil(foregroundTiles[i][j].Y / 16);
            
	    if(!foregroundTiles[i][j].empty){
            	ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
	    }
	    
	    foregroundTiles[i][j].endX = foregroundTiles[i][j].startX + (dx/8)*64 + 60;
    	    foregroundTiles[i][j].endY = foregroundTiles[i][j].startY + (dy/8)*64 + 96;
        }
    }
    
    //displays the pause menu if it is toggled
    if(mainMenuOn){
        showMainMenu();
    }
}

//handles events for when keys are pressed down
function levelHandler(){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){        
        case 27: //escape key, toggles the pause menu
		mainMenuOn = true;
		document.onkeydown = null;
		document.onkeydown = mainMenuHandler;
		for ( i = 0; i < Enemies.length; i++ ){
			if ( Enemies[i].death == false)
 			  Enemies[i].whichAction = "listen";
		}
                currentOption = 0;
                options = ["Resume", "Items", "Map", "Save Game", "Exit"];
            break;
        case 32: // space, begins attacking if not already attacking
	if ( Player.whichAction != "attack" )
	    Player.attack();
	    break;    
	case 37:
        case 38:
        case 39:
        case 40:
	    moveMap(keyCode);
	    break;
        case 70: //f, toggles full screen
            toggleFullScreen();
            break;
	case 86: //v
	for ( i = 0; i < Villagers.length; i++ ) {
	    if ( collisionSquare(Player.iBox[0],Player.iBox[1],Player.iBox[2],Player.iBox[3],Villagers[i].startX+(dx/8)*64,Villagers[i].endX,Villagers[i].startY+(dy/8)*64,Villagers[i].endY) == true ) {
		 initIMenu(i);
	    	break;
	    }
	}
	    break;
        default:
            break;
    }
}

//handles events for when keys are released
function levelHandler2(){
    var keyCode = event.which || event.keyCode;
	switch(keyCode){
		case 37: //left, stops player from moving left
			pLeft = false;
			left = false;
			break;
		case 38: //up, stops player from moving up
			pUp = false;
			up = false;
			break;
		case 39: //right, stops player from moving right 
			pRight = false;
			right = false;
			break;
		case 40: //down, stops player from moving down
			pDown = false;
			down = false;
			break;
		default:
			break;
	}
}

function moveMap(direction){	
    	var collision = generalCollision();
	
	var upperLeft = collision[1] + collision[2];
	var upperRight = collision[0] + collision[2];
	var lowerLeft = collision[1] + collision[3];
	var lowerRight = collision[0] + collision[3];
	
	if(direction == 37 && lowerRight != 2 && upperRight != 2){
		pLeft = true;
		left = true;
	}else if(direction == 38 && lowerLeft != 2 && lowerRight != 2){
		pUp = true;
		up = true;
	}else if(direction == 39 && lowerLeft != 2 && upperLeft != 2){
		pRight = true;
		right = true;
	}else if(direction == 40 && upperRight != 2 && upperLeft != 2){
		pDown = true;
		down = true;
	}else if(isBlocked){
		pLeft = false;
		pRight = false;
		pUp = false;
		pDown = false;
		left = false;
		right = false;
		up = false;
		down = false;
		
		isBlocked = false;
	}
}

//------------------------------Text Box-------------------------------------------
function initTextBox(i) {
	printText = 0;
	document.onkeydown = null;
	document.onkeydown = textHandler;
}

function drawTextBox(sentence,position) {
	if ( sentence.length != 0 ) {
	   ctx.fillStyle = "#FFFFFF";
	   ctx.drawImage(interactionMenuImage, width*.09, height*.70, width*.84, height*.20);	   
	   //ctx.fillRect(width*.10,height*.70,width*.80,height*.20);
	   ctx.font = "60px Sniglet";
	   ctx.fillStyle = "#000000";
	   ctx.fillText(sentence.substring(position*60,position*60+60),width*.12,height*.78);
	if ( sentence.length > position*60+60 )
	   ctx.fillText(sentence.substring(position*60+60,position*60+120),width*.12,height*(.86));
	}
}

function textHandler(event) {
	var j = 0;
	for ( i = 0; i < Villagers.length; i++ ) {
		if ( textInteraction(Villagers[i]) == true ){
		    j = i;
		    break;
		}
	}
	var keyCode = event.which || event.keyCode;
	if ( keyCode == 13 ) {
	 if ( Villagers[j].sentence.length <= printText*60 + 120 ){
	   document.onkeydown = null;
	   document.onkeydown = iMenuHandler;
	   printText = -1;
	 }
	 else 
	 printText+=2;
	}
}
	
//------------------------------Options Menu Option--------------------------------
function initOptions(){
    options = ["Options Menu", "Press Enter To Exit"];
    currentOption = 0;
    background.src= "images/backgrounds/OptionsMenuBackground.png";
}

function drawOptionsScreen(){
    ctx.clearRect(0,0,width,height);
    
    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = "black";
    ctx.font = "100px Sniglet";
    ctx.fillText(options[0], width / 2 - 300, 200);
    
    ctx.font = "60px Sniglet";
    ctx.fillText(options[1], width / 2 - 230, 500);
}

function optionsHandler(event){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){
        case 13:
            cancelAnimationFrame(drawing);
            showStartMenu();
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}
//---------------------------------------------------------------------------------

//--------------------------------Save Menu Option---------------------------------
function initSaveFile(){
    options = [];
    var secondsString = (saveFiles[0].seconds < 10) ? "0" + saveFiles[0].seconds : saveFiles[0].seconds;	
    var minutesString = (saveFiles[0].minutes < 10) ? "0" + saveFiles[0].minutes : saveFiles[0].minutes;
	
    options.push("1. " + saveFiles[0].name + " - Location: " + saveFiles[0].location + " " +
		 saveFiles[0].hours + ":" + minutesString + ":" + secondsString);
	    
    /*for(var i = 0; i < 3; i++){
	    if(saveFiles[i].newGame == "no"){
		options.push("New game");	    
	    }else{
	    	options.push("1. " + saveFiles[i].name + " - Location: " + saveFiles[i].location + " " + saveFiles[i].time + ":00");
	    }
    }*/
	
    options.push("Exit");
    currentOption = 0;
    
    background.src= "images/backgrounds/SaveMenuBackground.png";
}

function drawSaveFileScreen(){
    ctx.clearRect(0,0,width,height);
    ctx.drawImage(background, 0, 0, width, height);

    ctx.textAlign = "center"; 
    ctx.fillStyle = "white";
    ctx.font = "bold 120px Sniglet";
    ctx.fillText("Save Files", width / 2, 200);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText("Save Files", width / 2, 200);
	
    ctx.font = "60px Sniglet";
    for(var i = 0; i < options.length-1; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2, 450+i*100);
    }
    
    if(options.length - 1 == currentOption){
        ctx.fillStyle = "yellow";
    }else{
        ctx.fillStyle = "white";
    }
    ctx.fillText(options[options.length-1], width / 2 - 50, 800);
	
    ctx.textAlign = "start"; 
}

function saveFileHandler(){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){
        case 13:
            if(currentOption == options.length - 1){
                cancelAnimationFrame(drawing);    
                showStartMenu();
            }else{
                alert("Save file " + (currentOption + 1) + " selected.");
            }
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
//---------------------------------------------------------------------------------

//draws a loading screen while waiting for a level/menu option to load
function drawLoadingScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Loading...", width / 2 - 200, height / 2 - 50);
}

function generalCollision() {
	var hit = [0, 0, 0, 0];
	for (var i = 0; i < bounds.length; i++ ) {
		hit = collisionInteraction(Player.standLeft,Player.standRight,Player.standUp,Player.standDown,
				bounds[i].startX+(dx/8)*64,bounds[i].endX,bounds[i].startY+(dy/8)*64,bounds[i].endY);
		var isEmpty = hit[0] + hit[1] + hit[2] + hit[3];
		
		if(isEmpty > 1 && bounds[i].solid){
			isBlocked = true;
			return hit;
		}else if(isEmpty > 1 || isEmpty < 0){
			hit[0] = bounds[i].side+2;
			sideOfScreen = hit[0]-2;
			hit[1] = 0;			
			hit[2] = 0;			
			hit[3] = 0;
			//console.log("Inside but not hit: " + isEmpty);
			
			return hit;
		}
	}
	
	return hit;
}

function addMapEntry(entry){
	var found = false;
	for(var i = 0; i < mapEntries.length; i++){
		if(entry === mapEntries[i]){
			found = true;
		}
	}
	
	if(!found){
		mapEntries.push(entry);
		
		db.collection('SaveFile').doc(firebase.auth().currentUser.uid).update({
                	entries: mapEntries
            	});
	}
}
