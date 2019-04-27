function loadLevel1(){ 	
			
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
