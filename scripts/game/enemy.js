var enemyImage = new Image();
enemyImage.src = "images/spritesheets/skeleton_sprites.png";

function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.enemyAnimation;
	that.startWalk = 0;
	that.startDeath = 12;
	that.moveAFrame = 9;
	that.deathAFrame = 6;
	that.attackAFrame = 6;
	that.aFrame = 0;
	that.direction = 0; // up,left,down,right
	that.action = 0;
	that.whichAction = "alive";
	that.xOff = 40; //34
	that.yOff = 20; // 30
	that.X = options.X+that.xOff;  // O
	that.Y = options.Y+that.xOff;  // O 
	that.totalHealth = options.totalHealth;  // O
	that.health = options.totalHealth;       // O
	that.lengthX = 60;
	that.lengthY = 92;
	that.time = Date.now();
	that.death = false;
	that.type = "Enemy";
	
	//Call the draw function to create basic enemy rectangle
	that.draw = function() {
		if ( that.whichAction == "alive" ) {
			if ( that.health > 0 )
			basicEnemyAI(that);
			else if ( that.health <= 0 && that.action != 12 ) {
			that.action = 12;
			that.aFrame = 0;
			that.direction = 0;
			}
			else
			enemyDeath(that);
		}
		if ( that.whichAction != "dead" ) {
			ctx.drawImage(enemyImage,64*Math.floor(that.aFrame),64*(that.direction+that.action),64,64,that.X+(dx/8)*64-that.xOff,that.Y+(dy/8)*64-that.yOff,128,128);
			drawHealth(that);
		}
	};
	
	//if enemy's health is 0, just dead
	that.checkDeath = function() {
		if ( that.health <= 0  )
			that.death = true;
	};
	
	return that;
}

function basicEnemyAI(Enemy) {
	if(Enemy.time + 800 < Date.now()){
		if(Enemy.time + 1600 < Date.now()){
			Enemy.time = Date.now();
		}
		if ( Player.standRight < Enemy.X +(dx/8)*64+Enemy.lengthX) {
			Enemy.X-=2;
			Enemy.direction = 1;
		}
		if ( Player.standLeft > Enemy.X + (dx/8)*64) {
			Enemy.X+=2;
			Enemy.direction = 3;
		}
	
		if ( Player.standDown < Enemy.Y + (dy/8)*64+Enemy.lengthY) {
			Enemy.Y-=2;
			Enemy.direction = 0;
		}
		if ( Player.standUp > Enemy.Y + (dy/8)*64) {
			Enemy.Y+=2;
			Enemy.direction = 2;
		}
	}

	Enemy.aFrame++;
		if ( Enemy.aFrame == Enemy.moveAFrame )
			Enemy.aFrame = 0;
}

function enemyDeath(Enemy) {
	Enemy.aFrame+=1/10;
	if ( Enemy.aFrame >= Enemy.deathAFrame ) {
		Enemy.aFrame = 0;
		Enemy.whichAction = "dead";
	}
	
}
