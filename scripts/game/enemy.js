var enemyImage = new Image();
enemyImage.src = "images/spritesheets/skeleton_sprites.png";
var enemyAnimation;

function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.xOff = 0; //34
	that.yOff = 0; // 30
	that.X = 540+that.xOff;
	that.Y = 420+that.xOff;
	that.health = 300;
	that.lengthX = 60;
	that.lengthY = 92;
	that.death = false;
	
	//Call the draw function to create basic enemy rectangle
	that.draw = function() {
		if ( that.death == false ) {
			ctx.drawImage(enemyImage,0,128,64,64,that.X-that.xOff+(dx/8)*64-40,that.Y-that.yOff+(dy/8)*64-20,128,128);
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
	if ( Player.standRight < Enemy.X +(dx/8)*64+Enemy.lengthX) 
		Enemy.X-=2;
	if ( Player.standLeft > Enemy.X + (dx/8)*64 )
		Enemy.X+=2;
	
	if ( Player.standDown < Enemy.Y + (dy/8)*64+Enemy.lengthY)
		Enemy.Y-=2;
	if ( Player.standUp > Enemy.Y + (dy/8)*64)
		Enemy.Y+=2;
	
	if ( Enemy.death == false )
		enemyAnimation = requestAnimationFrame(basicEnemyAI);
	else		
    		cancelAnimationFrame(enemyAnimation);
}
