function SceneHandler(scene){
    this.scene = scene,
    this.drawScene = function(){
        scene.draw();
        drawing = requestAnimationFrame(sceneHandler.drawScene);
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
                        if(pixelData[row+j] == 0 && pixelData[row+j+1] == 255 && pixelData[row+j+2] == 0){ //green
                            backTiles.push(1);
                        }else if(pixelData[row+j] == 165 && pixelData[row+j+1] == 42 && pixelData[row+j+2] == 42){ //brown
                            backTiles.push(2);
                        }else{
                            backTiles.push(-1);
                        }
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
                        if(pixelData[row+j] == 0 && pixelData[row+j+1] == 255 && pixelData[row+j+2] == 0){ //green
                            foreTiles.push(1);
                        }else if(pixelData[row+j] == 165 && pixelData[row+j+1] == 42 && pixelData[row+j+2] == 42){ //brown
                            foreTiles.push(2);
                        }else{
                            foreTiles.push(-1);
                        }
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
    this.player = new initPlayer({
       X: 1024,
       Y: 512,
       aFrame: 0
    });
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
		this.player.moveCheck(pUp,pDown,pLeft,pRight);
        	this.player.draw(canvas.getContext("2d"));
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
    
    var xPos = 0, yPos = 0; 
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < colSize; j++){
            switch(backgroundTiles[i][j]){
                case 1:
                    xPos = 3;
                    yPos = 1;
                    break;
                case 2:
                    xPos = 1;
                    yPos = 0;
                    break;
                case 3:                 
                    xPos = 0;
                    yPos = 2;
                    break;
                default:
                    xPos = 3;
                    yPos = 1;
                    break;
            }
            
            if(j == 0 && ((j+(dx/8))+0.25)*64 > 0){
                left = false;
            }else if(j == 0){
                left = true;
            }

            if(j == colSize-1 && ((j+(dx/8))+0.75)*64 < width){
                right = false;
            }else if(j == colSize - 1){
                right = true;
            }

            if(i == 0 && ((i+(dy/8))+0.25)*64 > 0){
                up = false;
            }else if(i == 0){
                up = true;
            }

            if(i == rowSize-1 && ((i+(dy/8))+0.75)*64 < height){
                down = false;
            }else if(i == rowSize - 1){
                down = true;
            }
            
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
            switch(foregroundTiles[i][j]){
                case 1:
                   xPos = 10;
                   yPos = 0;
                   break;
               case 2:
                   xPos = 10;
                   yPos = 9;
                   break;
               case 3:                 
                   xPos = 0;
                   yPos = 0;
                   break;
               default:
                   xPos = 0;
                   yPos = 0;
                   break;
            }          
            
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
        case 37: //left
            pLeft = true;
            if(left){
                dx++;
            }
            break;
        case 38: //up
            pUp = true;
            if(up){
                dy++;
            }
            break;
        case 39: //right
            pRight = true;
            if(right){
                dx--;
            }
            break;
        case 40: //down
            pDown = true;
            if(down){
                dy--;
            }
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
			break;
		case 38: // up
			pUp = false;
			break;
		case 39: // right
			pRight = false;
			break;
		case 40:
			pDown = false;
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
