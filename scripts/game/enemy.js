var enemyImage = new Image();
enemyImage.src = "images/spritesheets/skeleton_sprites.png";

function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.enemyAnimation;
	that.startWalk = 0;
	that.startDeath = 12;
	that.startAttack = 4; 
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
	that.iBox = [that.X+(dx/8)*64,that.X+(dx/8)*64,that.Y+(dy/8)*64,that.Y+(dy/8)*64]; //x1,x2,y1,y2
	that.attackSpeed = 1000/5;
	
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
			ctx.fillStyle = "#F0F0F0";
			ctx.fillRect(that.iBox[0],that.iBox[2],(that.iBox[1]-that.iBox[0]),(that.iBox[2]-that.iBox[3]));
			drawHealth(that);
		}
	};
	
	//if enemy's health is 0, just dead
	that.checkDeath = function() {
		if ( that.health <= 0  )
			that.death = true;
	};
	
	that.attack = function() { 
		// Still have to calculate boundson skeleton arm for collision
		that.action = that.startAttack;
		that.aFrame = -1;
		that.whichAction = "attack";
		setTimeout(animateAttack,0,that);
	};
	
	return that;
}

function basicEnemyAI(Enemy) {
   if ( Enemy.whichAction != "attack" ) {
	if(Enemy.time + 800 < Date.now()){
		if(Enemy.time + 1600 < Date.now()){
			Enemy.time = Date.now();
		}
		if ( Player.standUp > Enemy.Y + (dy/8)*64) {
			Enemy.Y+=2;
			Enemy.direction = 2;
		}
		if ( Player.standDown < Enemy.Y + (dy/8)*64+Enemy.lengthY) {
			Enemy.Y-=2;
			Enemy.direction = 0;
		}
		if ( Player.standRight < Enemy.X +(dx/8)*64+Enemy.lengthX) {
			Enemy.X-=2;
			Enemy.direction = 1;
		}
		if ( Player.standLeft > Enemy.X + (dx/8)*64) {
			Enemy.X+=2;
			Enemy.direction = 3;
		}


	}	
	if ( Enemy.direction == 0 ) {
		Enemy.iBox[0] = Enemy.X + (dx/8)*64;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64;
	  }
	else if ( Enemy.direction == 1 ) {
		Enemy.iBox[0] = Enemy.X + (dx/8)*64 - 22;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64 + 44;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + 66;
	  }
	else if ( Enemy.direction == 2 ) {
		Enemy.iBox[0] = Enemy.X + (dx/8)*64;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64;	
	  }
	else {
		Enemy.iBox[0] = Enemy.X + (dx/8)*64 + Enemy.lengthX;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64 + Enemy.lengthX + 22;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64 + 44;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + 66;	
          }
	
	Enemy.aFrame++;
		if ( Enemy.aFrame == Enemy.moveAFrame )
			Enemy.aFrame = 0;
	
	if ( collisionSquare(Enemy.iBox[0],Enemy.iBox[1],Enemy.iBox[2],Enemy.iBox[3],Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true ) 
		Enemy.attack();
	
   }
}

function enemyDeath(Enemy) {
	Enemy.aFrame+=1/10;
	if ( Enemy.aFrame >= Enemy.deathAFrame ) {
		Enemy.aFrame = 0;
		Enemy.whichAction = "dead";
	}
	
}
