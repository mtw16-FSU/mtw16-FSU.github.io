function loadLevel1(side){ 	
      		//sets keyboard input handlers for player movement and map logic
		document.onkeydown = levelHandler;
                document.onkeyup = levelHandler2;
		
		//loads in map files
                image1.src = "maps/Level1Background.png";
                image2.src = "maps/Level1Foreground.png";
                
		//loads in the spritesheet that will be used
		sceneHandler.scene.map.getMap("images/spritesheets/level1.png");
	
		if(side == 1){		
			Player.X = 140;
			Player.Y = 800;
			
			dx = 0;
			dy = -270;
		}else if(side == 3){			
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
		sceneHandler.scene.nextMaps[2] = "Beach";
			
		Villagers.push(new initVillager({
				X: 2000,
				Y: 1000,
				sentence: "My Lord! The prophecies heralded your return. Your path to take back your throne begins now, sire. Your rivals stand in your way, once you defeat them, you may leave this province in the top right and head towards the castle!",
				type: "shop"
				}));

		Villagers.push(new initVillager({
				X: 500,
				Y: 800,
				sentence: "Please, head north towards the castle. My brother on your right may be able to sell you some valuable items.",
				type: "interact"
				}));
			
		Enemies.push(new initEnemy({ 
					X: 200,
					Y: 900,
					totalHealth: 2000,
					moveSpeed: 2,
					enemyClass: "skeleKnight"
				})); 	    
		
		Enemies.push(new initEnemy({
					X: 750,
					Y: 2000,
					totalHealth: 300,
					moveSpeed: 4,
					enemyClass: "Skeleton"
					}));
	
		Enemies.push(new initEnemy({
					X: 1500,
					Y: 600,
					totalHealth: 150,
					moveSpeed: 6,
					enemyClass: "Skeleton"
					}));
	
		Enemies.push(new initEnemy({
					X: 1300,
					Y: 450,
					totalHealth: 250,
					moveSpeed: 5,
					enemyClass: "Skeleton"
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
			sentence: "You are here at last! Thank the gods!",
			type: "shop"
			}));

	Villagers.push(new initVillager({
			X: 800,
			Y: 800,
			sentence: "It is you! The legendary hero " + saveFiles[0].name + "!",
		   	type: "shop"
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
			sentence: "Long have we awaited your return!",
			type: "interact"
			}));

	Villagers.push(new initVillager({
			X: 800,
			Y: 800,
			sentence: "Wait, who are you?",
			type: "interact"
			}));
	
	Villagers.push(new initVillager({ // King
			X: 1000,
			Y: 250,
			sentence: "I am the king. Long have I awaited you.",
			type: "interact"
			}));

	    bounds.push(Villagers[0]);
	    bounds.push(Villagers[1]);
	    bounds.push(Villagers[2]);

}

function loadBeach(side){
	
	document.onkeydown = levelHandler;
        document.onkeyup = levelHandler2;
		
	//loads in map files
        image1.src = "maps/beachBackground.png";
        image2.src = "maps/beachForeground.png";
                
	//loads in the spritesheet that will be used
	sceneHandler.scene.map.getMap("images/spritesheets/beach_sheet.png");
	
		
	if(side == 1){		
		Player.X = 1024;
		Player.Y = 800;	
		
		dx = -35;
		dy = -670;
	}else if(side == 3){	
		Player.X = 300;
		Player.Y = 120;
		
		dx = 0;
		dy = 0;
	}else{
		Player.X = 1024;
		Player.Y = 512;

		dx = -100;
		dy = -100;
	}

	
	sceneHandler.scene.nextMaps[0] = "Level 1";
	sceneHandler.scene.nextMaps[2] = "Cave";
	
	Enemies.push(new initEnemy({
			X: 750,
			Y: 2000,
			totalHealth: 300,
			moveSpeed: 2,
			enemyClass: "Skeleton"
			}));
	
	Enemies.push(new initEnemy({
			X: 1500,
			Y: 600,
			totalHealth: 150,
			moveSpeed: 5,
			enemyClass: "Skeleton"
			}));
	
	Enemies.push(new initEnemy({
			X: 1000,
			Y: 450,
			totalHealth: 250,
			moveSpeed: 3,
			enemyClass: "Skeleton"
			}));
		
	Villagers.push(new initVillager({
			X: 2100,
			Y: 1100,
			sentence: "Sorry, all of my boats are rented out. I can't give you one right now, come back later.",
			type: "interact"
			}));

	 bounds.push(Villagers[0]);

}

function loadCave(side){
	
	document.onkeydown = levelHandler;
        document.onkeyup = levelHandler2;
		
	//loads in map files
        image1.src = "maps/Level3Background.png";
        image2.src = "maps/Level3Foreground.png";
                
	//loads in the spritesheet that will be used
	sceneHandler.scene.map.getMap("images/spritesheets/level3.png");
	
	if(side == 3){
		Player.X = 300;
		Player.Y = 320;

		dx = 0;
		dy = 0;
	}else if(side == 1){
		Player.X = 1024;
		Player.Y = 800;

		dx = -90;
		dy = -230;
	}else{		
		Player.X = 1024;
		Player.Y = 512;

		dx = -100;
		dy = 0;
	}
			
	
	sceneHandler.scene.nextMaps[0] = "Beach";	
	sceneHandler.scene.nextMaps[2] = "Graveyard";
	
	Enemies.push(new initEnemy({
			X: 750,
			Y: 2000,
			totalHealth: 300,
			moveSpeed: 2,
			enemyClass: "Wolf"
			}));
	
	Enemies.push(new initEnemy({
			X: 1500,
			Y: 600,
			totalHealth: 150,
			moveSpeed: 5,
			enemyClass: "Wolf"
			}));
	
	Enemies.push(new initEnemy({
			X: 1000,
			Y: 450,
			totalHealth: 250,
			moveSpeed: 3,
			enemyClass: "Wolf"
			}));
		
}

function loadGraveyard(side){
	
	document.onkeydown = levelHandler;
        document.onkeyup = levelHandler2;
		
	//loads in map files
        image1.src = "maps/graveyardBackground.png";
        image2.src = "maps/graveyardForeground.png";
                
	//loads in the spritesheet that will be used
	sceneHandler.scene.map.getMap("images/spritesheets/graveyard_sheet.png");
	
	if(side == 3){
		Player.X = 1024;
		Player.Y = 120;

		dx = -70;
		dy = 0;
	}else if(side == 1){
		Player.X = 1024;
		Player.Y = 800;

		dx = -70;
		dy = -260;
	}else{		
		Player.X = 1024;
		Player.Y = 512;

		dx = -100;
		dy = 0;
	}
			
	
	sceneHandler.scene.nextMaps[0] = "Cave";	
	sceneHandler.scene.nextMaps[2] = "Sewer";
	
	Enemies.push(new initEnemy({
			X: 750,
			Y: 2000,
			totalHealth: 300,
			moveSpeed: 2,
			enemyClass: "Wolf"
			}));
	
	Enemies.push(new initEnemy({
			X: 1500,
			Y: 600,
			totalHealth: 150,
			moveSpeed: 5,
			enemyClass: "Wolf"
			}));
	
	Enemies.push(new initEnemy({
			X: 1000,
			Y: 450,
			totalHealth: 250,
			moveSpeed: 3,
			enemyClass: "Wolf"
			}));

	Enemies.push(new initEnemy({
				X: 750,
				Y: 2000,
				totalHealth: 300,
				moveSpeed: 4,
				enemyClass: "Skeleton"
				}));
	
	Enemies.push(new initEnemy({
				X: 1500,
				Y: 600,
				totalHealth: 150,
				moveSpeed: 6,
				enemyClass: "Skeleton"
				}));
	
	Enemies.push(new initEnemy({
				X: 1000,
				Y: 450,
				totalHealth: 250,
				moveSpeed: 5,
				enemyClass: "Skeleton"
				}));
	
}

function loadSewer(side){
	
	document.onkeydown = levelHandler;
        document.onkeyup = levelHandler2;
		
	//loads in map files
        image1.src = "maps/sewerBackground.png";
        image2.src = "maps/sewerForeground.png";
                
	//loads in the spritesheet that will be used
	sceneHandler.scene.map.getMap("images/spritesheets/sewer_sheet.png");
	
	if(side == 3){
		Player.X = 1800;
		Player.Y = 120;

		dx = -100;
		dy = 0;
	}else{		
		Player.X = 1024;
		Player.Y = 512;

		dx = -100;
		dy = 0;
	}
			
	
	sceneHandler.scene.nextMaps[0] = "Graveyard";	

	Enemies.push(new initEnemy({
				X: 750,
				Y: 2000,
				totalHealth: 300,
				moveSpeed: 4,
				enemyClass: "Skeleton"
				}));
	
	Enemies.push(new initEnemy({
				X: 1500,
				Y: 600,
				totalHealth: 150,
				moveSpeed: 6,
				enemyClass: "Skeleton"
				}));
	
	Enemies.push(new initEnemy({
				X: 1000,
				Y: 450,
				totalHealth: 250,
				moveSpeed: 5,
				enemyClass: "Skeleton"
				}));
	
}
