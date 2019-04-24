var enemyImage = new Image();
enemyImage.src = "images/spritesheets/skeleton_sprites.png";
var enemyAnimation;

function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.xOff = 40; //34
	that.yOff = 20; // 30
	that.X = 500+that.xOff;
	that.Y = 400+that.xOff;
	that.totalHealth = 300;
	that.health = 300;
	that.lengthX = 60;
	that.lengthY = 92;
	that.time = Date.now();
	that.death = false;
	that.type = "Enemy";
	
	//Call the draw function to create basic enemy rectangle
	that.draw = function() {
		if ( that.death == false ) {
			ctx.drawImage(enemyImage,0,128,64,64,that.X+(dx/8)*64-that.xOff,that.Y+(dy/8)*64-that.yOff,128,128);
			drawHealth(that);
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
	if(Enemy.time + 800 < Date.now()){
		if(Enemy.time + 1600 < Date.now()){
			Enemy.time = Date.now();
		}
		if ( Player.standRight < Enemy.X +(dx/8)*64+Enemy.lengthX) 
			Enemy.X-=2;
		if ( Player.standLeft > Enemy.X + (dx/8)*64)
			Enemy.X+=2;
	
		if ( Player.standDown < Enemy.Y + (dy/8)*64+Enemy.lengthY)
			Enemy.Y-=2;
		if ( Player.standUp > Enemy.Y + (dy/8)*64)
			Enemy.Y+=2;
	}
	
	if ( Enemy.death == false )
		enemyAnimation = requestAnimationFrame(basicEnemyAI);
	else		
    		cancelAnimationFrame(enemyAnimation);
}
