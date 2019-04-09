function SceneHandler(scene){
    this.scene = scene,
    this.drawScene = function(ctx){
        scene.draw(ctx);
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
                image1.src = "maps/Level1Background.png";
                image2.src = "maps/Level1Foreground.png";
                map.getMap("images/spritesheets/spritesheet1.png");
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
            canvas.width = image1.width;
            canvas.height = image1.height;

            image1.onload = function(){
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
            }

            map.backgroundTiles = tiles1;
            map.foregroundTiles = tiles2;
            map.rowSize = image1.height;
            map.colSize = image1.width;

        }
        
        drawing = setInterval(function(){
            sceneHandler.drawScene(ctx)
        }, 1000/60);
    },
    this.draw = function(ctx){
        map.draw(ctx);
    }
}

function Map(name){
    this.name = name,
    this.foregroundTiles = [],
    this.backgroundTiles = [],
    this.rowSize = 0,
    this.colSize = 0,
    this.image = new Image(),
    this.draw = function(ctx){
        switch(this.name){
            case "Level 1":
                drawLevel(ctx, this, this.backgroundTiles,this.foregroundTiles, this.rowSize, this.colSize);
                break;
            case "Options":
                drawOptionsScreen(ctx);
                break;
            case "Save Files":
                drawSaveFileScreen(ctx);
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

function drawLevel(ctx, map, backgroundTiles, foregroundTiles, rowSize, colSize){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);

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
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,j*64,i*64,64,64);
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
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,j*64,i*64,64,64);
        }
    }
}

function levelHandler(){
    switch(event.keyCode){
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}

function initOptions(){
    options = ["Options Menu", "Press Backspace To Exit"];
}

function drawOptionsScreen(ctx){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "black";
    ctx.font = "100px Sniglet";
    ctx.fillText(options[0], width / 2 - 300, 200);
    
    ctx.font = "60px Sniglet";
    ctx.fillText(options[1], width / 2 - 300, 500);
}

function optionsHandler(event){
    switch(event.keyCode){
        case 8:
            clearInterval(drawing);
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
    options = ["Save Files", "Press Backspace To Exit"];
}

function drawSaveFileScreen(ctx){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "black";
    ctx.font = "100px Sniglet";
    ctx.fillText(options[0], width / 2 - 200, 200);
    
    ctx.font = "60px Sniglet";
    ctx.fillText(options[1], width / 2 - 300, 500);
}

function saveFileHandler(){
    switch(event.keyCode){
        case 8:
            clearInterval(drawing);
            showStartMenu();
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}
