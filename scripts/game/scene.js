//loads the player in at the middle of the screen 
Player = new initPlayer({
       X: 1024,
       Y: 512,
       aFrame: 0
    });

Enemy = new initEnemy({}); 

Villager = new initVillager({});

// Helps Textbox Printing
printText = 0;

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
    }
}

//handles loading maps and the logic for them
function Scene(name, map){
    this.map = map,
    this.name = name,
    this.getScene = function(name){
        this.name = name;
        this.map.name = name;
	    
	//removes any keyboard input handler that is currently active
        document.onkeydown = null;
        
        var isLevel = true;
        var image1 = new Image();
        var image2 = new Image();
        
        switch(this.name){
            case "Level 1":
      		//sets keyboard input handlers for player movement and map logic
		document.onkeydown = levelHandler;
                document.onkeyup = levelHandler2;
		
		//loads in map files
                image1.src = "maps/Level1Background.png";
                image2.src = "maps/Level1Foreground.png";
                
		//loads in the spritesheet that will be used
		map.getMap("images/spritesheets/level1.png");
		
		//loads in enemy
		Enemy = new initEnemy({});
                break;
            case "Options":
                initOptions();
                document.onkeydown = optionsHandler;
                isLevel = false;
                break;
            case "Save Files":
                initSaveFile();
                document.onkeydown = saveFileHandler;
                isLevel = false;
                break;
            default:
                break;
        }

        if(isLevel){
            var tiles1 = [];
            var tiles2 = [];   

	    //creates temporary canvas to draw the map file on so its
	    //pixel data can be extracted to draw the map
            var canvas = document.createElement('canvas');
	    image1.onload = function(){
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
                        backTiles.push([pixelData[row+j+1],y=pixelData[row+j+2]]);
                    }
                    tiles1.push(backTiles);
                }
                
                map.backgroundTiles = tiles1;
            
                map.rowSize = image1.height;
                map.colSize = image1.width;
            }

	    //repeats the same process for loading information about the foreground tiles
            image2.onload = function(){
                canvas.getContext('2d').drawImage(image2,0,0,image1.width,image1.height);
                pixelData = canvas.getContext('2d').getImageData(0,0,image2.width,image2.height).data;
                for(var i = 0; i < image2.height; i++){
                   var row = i * image2.width * 4;
                   var foreTiles = [];
                    for(var j = 0; j < image2.width*4; j += 4){
                        foreTiles.push([pixelData[row+j+1],y=pixelData[row+j+2]]);
                    }
                    tiles2.push(foreTiles);
                }
                
                map.foregroundTiles = tiles2;
            }
            
            //sets default values for the level
            mainMenuOn = false;
            dx = 0;
            dy = 0;
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
        drawing = requestAnimationFrame(sceneHandler.drawScene);
    },
    this.draw = function(){
        map.draw();
    }
}

function Map(name){
    this.name = name,
    this.foregroundTiles = [],
    this.backgroundTiles = [],
    this.rowSize = 0,
    this.colSize = 0,
    this.image = new Image(),
    this.draw = function(){
        switch(this.name){
            case "Level 1":
                drawLevel(this, this.backgroundTiles,this.foregroundTiles, this.rowSize, this.colSize);
		
		//only draws player and updates player logic if the pause menu is not toggled
		if(!mainMenuOn){
			Player.moveCheck(pUp,pDown,pLeft,pRight,width,height);
			Player.draw();
			Player.collisionCheck(Enemy);
			Enemy.draw();
			Villager.draw();
			if ( Villager.drawText == true )
				drawTextBox(Villager.sentence,printText);
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
    }
}

var mainMenuOn = false;
var dx = 0, dy = 0;
var left = false, up = false, right = false, down = false;
var pLeft = false, pRight = false, pDown = false, pUp = false
function drawLevel(map, backgroundTiles, foregroundTiles, rowSize, colSize){
    ctx.clearRect(0,0,width,height);
    drawLoadingScreen();
    
    //moves the player through the map until the left edge is reached
    if(((dx/8)+0.25)*64 > 0 || Player.X > 1024){
    	left = false;
    }

    //moves the player through the map until the right edge is reached
    if(((colSize-1+(dx/8))+0.75)*64 < width || Player.X < 1024){
    	right = false;
    }

    //moves the player through the map until the up edge is reached
    if(((dy/8)+0.25)*64 > 0 || Player.Y > 512){
    	up = false;
    }

    //moves the player through the map until the down edge is reached
    if(((rowSize-1+(dy/8))+0.75)*64 < height || Player.Y < 512){
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
            xPos = backgroundTiles[i][j][0] / 16;
            yPos = backgroundTiles[i][j][1] / 16;
            
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
		
            xPos = foregroundTiles[i][j][0] / 16;
            yPos = foregroundTiles[i][j][1] / 16;
            
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
        }
    }
    
    //displays the pause menu if it is toggled
    if(mainMenuOn){
        showMainMenu();
        document.onkeydown = null;
        document.onkeydown = mainMenuHandler;
    }
}

//handles events for when keys are pressed down
function levelHandler(){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){        
        case 27: //escape key, toggles the pause menu
                mainMenuOn = true;
                currentOption = 0;
                options = ["Resume", "Exit"];
            break;
        case 32: // space, begins attacking if not already attacking
	if ( Player.whichAction != "attack" )
	    Player.attack();
	    break;    
        case 37: //left, moves player left
            pLeft = true;
	    left = true;
            break;
        case 38: //up, moves player up
            pUp = true;
	    up = true;
            break;
        case 39: //right, moves player right
            pRight = true;
	    right = true;
            break;
        case 40: //down, moves player down
            pDown = true;
	    down = true;
            break;
        case 70: //f, toggles full screen
            toggleFullScreen();
            break;
	case 86: //v
	    if ( collisionInteraction(Player.iBox[0],Player.iBox[1],Player.iBox[2],Player.iBox[3],Villager.startX+(dx/8)*64,Villager.endX,Villager.startY+(dy/8)*64,Villager.endY) == true )
		 initTextBox();
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

//------------------------------Text Box-------------------------------------------
function initTextBox() {
	printText = 0;
	Villager.drawText = true;
	document.onkeydown = null;
	document.onkeyup = null;
	document.onkeydown = textHandler;		
}

function drawTextBox(sentence,position) {
	if ( sentence.length != 0 ) {
	   ctx.fillStyle = "#FFFFFF";
	   ctx.fillRect(width*.10,height*.70,width*.80,height*.20);
	   ctx.font = "60px Sniglet";
	   ctx.fillStyle = "#000000";
	   ctx.fillText(sentence.substring(position*30,position*30+30),width*.11,height*.78);
	if ( sentence.length > position*30+30 )
	   ctx.fillText(sentence.substring(position*30+30,position*30+60),width*.11,height*(.86));
	}
}

function textHandler(event) {
	var keyCode = event.which || event.keyCode;
	if ( keyCode == 32 ) {
	 if ( Villager.sentence.length <= printText*10 + 20 ){
	   Villager.drawText = false;
	   document.onkeydown = null;
	   document.onkeydown = levelHandler;
	   document.onkeyup = levelHandler2;
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
    drawLoadingScreen();
    
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
    options = ["Save File 1", "Save File 2", "Save File 3", "Exit"];
    currentOption = 0;
    
    background.src= "images/backgrounds/SaveMenuBackground.png";
}

function drawSaveFileScreen(){
    ctx.clearRect(0,0,width,height);
    drawLoadingScreen();
    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Save Files", width / 2 - 200, 200);
    
    ctx.font = "60px Sniglet";
    for(var i = 0; i < options.length-1; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2 - 130, 450+i*100);
    }
    
    if(options.length - 1 == currentOption){
        ctx.fillStyle = "yellow";
    }else{
        ctx.fillStyle = "white";
    }
    ctx.fillText(options[options.length-1], width / 2 - 50, 800);
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
