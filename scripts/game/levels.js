function loadLevel1(side){ 	
      		//sets keyboard input handlers for player movement and map logic
		document.onkeydown = levelHandler;
                document.onkeyup = levelHandler2;
		
		//loads in map files
                image1.src = "maps/Level1Background.png";
                image2.src = "maps/Level1Foreground.png";
                
		//loads in the spritesheet that will be used
		sceneHandler.scene.map.getMap("images/spritesheets/level1.png");
	
		if(side == 3){			
			Player.X = 1240;
			Player.Y = 150;

			dx = -140;
			dy = 0;		
		}else{
			Player.X = 1024;
			Player.Y = 512

			dx = 0;
			dy = 0;		
		}

		sceneHandler.scene.nextMaps[0] = "Village";
			
		Villagers.push(new initVillager({
				X: 2000,
				Y: 1000,
				sentence: "My Lord! The prophecies heralded your return. Your path to take back your throne begins now, sire. Your rivals stand in your way, once you defeat them, you may leave this province in the top right and head towards the castle!"
				}));

		Villagers.push(new initVillager({
				X: 500,
				Y: 800,
				sentence: "Second villager"
				}));
			
		Enemies.push(new initEnemy({ 
					X: 500,
					Y: 300,
					totalHealth: 300
				})); 	    
			
		Enemies.push(new initEnemy({
					X: 500,
					Y: 600,
					totalHealth: 100
					}));

    bounds.push(Villagers[0]);
    bounds.push(Villagers[1]);

}


function loadLevel2(side){
	
	//sets keyboard input handlers for player movement and map logic
	document.onkeydown = levelHandler;
        document.onkeyup = levelHandler2;
		
	//loads in map files
        image1.src = "maps/Level2Background.png";
        image2.src = "maps/Level2Foreground.png";
                
	//loads in the spritesheet that will be used
	sceneHandler.scene.map.getMap("images/spritesheets/level2.png");
	
	if(side == 3){
		Player.X = 1024;
		Player.Y = 50;

		dx = -60;
		dy = 0;
	}else if(side == 1){
		Player.X = 1024;
		Player.Y = 800;

		dx = -60;
		dy = -270;
	}else{	
		Player.X = 1024;
		Player.Y = 512;

		dx = 0;
		dy = -50;
	}
			
	sceneHandler.scene.nextMaps[0] = "Castle";	
	sceneHandler.scene.nextMaps[2] = "Level 1";
	
	Villagers.push(new initVillager({
			X: 1100,
			Y: 1700,
			sentence: "You are here at last! Thank the gods!"
			}));

	Villagers.push(new initVillager({
			X: 800,
			Y: 800,
			sentence: "It is you! The legendary hero " + saveFiles[0].name + "!"
			}));
			

    bounds.push(Villagers[0]);
    bounds.push(Villagers[1]);

}

function loadCastle(side){
	
	document.onkeydown = levelHandler;
        document.onkeyup = levelHandler2;
		
	//loads in map files
        image1.src = "maps/CastleBackground.png";
        image2.src = "maps/CastleForeground.png";
                
	//loads in the spritesheet that will be used
	sceneHandler.scene.map.getMap("images/spritesheets/Castle_sheet.png");
			
	Player.X = 1024;
	Player.Y = 800;
			
	dx = 0;
	dy = -125;
	
	sceneHandler.scene.nextMaps[2] = "Village";
	
	Villagers.push(new initVillager({
			X: 1100,
			Y: 1500,
			sentence: "Long have we awaited your return!"
			}));

	Villagers.push(new initVillager({
			X: 800,
			Y: 800,
			sentence: "Wait, who are you?"
			}));
	
	Villagers.push(new initVillager({
			X: 1000,
			Y: 250,
			sentence: "I am the king. Long have I awaited you."
			}));

	    bounds.push(Villagers[0]);
	    bounds.push(Villagers[1]);

}
