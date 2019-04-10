 Player = new initPlayer({
       X: 1024,
       Y: 512,
       aFrame: 0
    });

Enemy = new initEnemy({}); 

function SceneHandler(scene){
    this.scene = scene,
    this.drawScene = function(){
        scene.draw();
        drawing = requestAnimationFrame(sceneHandler.drawScene);
	if(Player.death){
		Player.death = false;
		cancelAnimationFrame(drawing);
            	showStartMenu();
	}
    }
}

function Scene(name, map){
    this.map = map,
    this.name = name,
    this.getScene = function(name){
        this.name = name;
        this.map.name = name;
        document.onkeydown = null;
        
        var isLevel = true;
        var image1 = new Image();
        var image2 = new Image();
        
        switch(this.name){
            case "Level 1":
                document.onkeydown = levelHandler;
                document.onkeyup = levelHandler2;
                image1.src = "maps/Level1Background.png";
                image2.src = "maps/Level1Foreground.png";
                map.getMap("images/spritesheets/level1.png");
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

            var canvas = document.createElement('canvas');
	    image1.onload = function(){
                canvas.width = image1.width;
                canvas.height = image1.height;
                canvas.getContext('2d').drawImage(image1,0,0,image1.width,image1.height);
                var pixelData = canvas.getContext('2d').getImageData(0,0,image1.width,image1.height).data;
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
		if(!mainMenuOn){
			Player.moveCheck(pUp,pDown,pLeft,pRight,width,height);
			Player.draw();
			Player.collisionCheck(Enemy);
			Enemy.draw();
		}
                break;
            case "Options":
                drawOptionsScreen();
                break;
            case "Save Files":
                drawSaveFileScreen();
                break;
            default:
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
    
	if(((dx/8)+0.25)*64 > 0 || Player.X > 1024){
                left = false;
        }

        if(((colSize-1+(dx/8))+0.75)*64 < width || Player.X < 1024){
        	right = false;
        }

        if(((dy/8)+0.25)*64 > 0 || Player.Y > 512){
                up = false;
        }

        if(((rowSize-1+(dy/8))+0.75)*64 < height || Player.Y < 512){
                down = false;
        }
		
	if(left){
		dx++;
	}
	
	if(right){
		dx--;
	}
	
	if(up){
		dy++;
	}
	
	if(down){
		dy--;
	}
	
    var xPos = 0, yPos = 0; 
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < colSize; j++){
            xPos = backgroundTiles[i][j][0] / 16;
            yPos = backgroundTiles[i][j][1] / 16;
            
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
		
            xPos = foregroundTiles[i][j][0] / 16;
            yPos = foregroundTiles[i][j][1] / 16;
            
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
        }
    }
    
    
    if(mainMenuOn){
        showMainMenu();
        document.onkeydown = null;
        document.onkeydown = mainMenuHandler;
    }
}



function levelHandler(){
     var keyCode = event.which || event.keyCode;
    switch(keyCode){        
        case 27: //escape key
                mainMenuOn = true;
                currentOption = 0;
                options = ["Resume", "Exit"];
            break;
        case 32: // space
	if ( Player.whichAction != "attack" )
	    Player.attack();
	    break;    
        case 37: //left
            pLeft = true;
	    left = true;
            break;
        case 38: //up
            pUp = true;
	    up = true;
            break;
        case 39: //right
            pRight = true;
	    right = true;
            break;
        case 40: //down
            pDown = true;
	    down = true;
            break;
        case 70: //f
            toggleFullScreen();
            break;
        default:
            break;
    }
}

function levelHandler2(){
    var keyCode = event.which || event.keyCode;
	switch(keyCode){
		case 37: // left
			pLeft = false;
			left = false;
			break;
		case 38: // up
			pUp = false;
			up = false;
			break;
		case 39: // right
			pRight = false;
			right = false;
			break;
		case 40:
			pDown = false;
			down = false;
			break;
		default:
			break;
	}
}

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

function drawLoadingScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Loading...", width / 2 - 200, height / 2 - 50);
}
