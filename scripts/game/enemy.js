var enemyImage = new Image();
enemyImage.src = "images/spritesheets/skeleton_sprites.png";

function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.X = 500;
	that.Y = 400;
	that.health = 300;
	that.length = 100;
	that.death = false;
	
	//Call the draw function to create basic enemy rectangle
	that.draw = function() {
		if ( that.death == false ) {
			ctx.drawImage(enemyImage,0,128,64,64,that.X+(dx/8)*64,that.Y+(dy/8)*64,128,128);
		}
	};
	
	//if enemy's health is 0, just dead
	that.checkDeath = function() {
		if ( that.health <= 0 )
			that.death = true;
	};
	
	return that;
}

function basicEnemyAI() {
	if ( Player.standRight < Enemy.X +(dx/8)*64) 
		Enemy.X-=5;
	if ( Player.standLeft > Enemy.X + (dx/8)*64 )
		Enemy.X+=5;
	
	if ( Player.standDown < Enemy.Y + (dy/8)*64)
		Enemy.Y-=5;
	if ( Player.standUp > Enemy.Y + (dy/8)*64)
		Enemy.Y+=5;
	
	if ( Enemy.death == false )
		setTimeout(basicEnemyAI,1000/20);
}
