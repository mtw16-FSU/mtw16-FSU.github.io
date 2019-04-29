var enemyImage = new Image();
var wolfImage = new Image();
var skeleKnightImage = new Image();
enemyImage.src = "images/spritesheets/skeleton_sprites.png";
wolfImage.src = "images/spritesheets/wolf.png";
skeleKnightImage.src = "images/spritesheets/skeleton2.png";

function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.enemyAnimation;
	that.aFrame = 0;
	that.direction = 0; // up,left,down,right
	that.action = 0;
	that.whichAction = "alive";
	that.X = options.X;  // O
	that.Y = options.Y;  // O 
	that.totalHealth = options.totalHealth;  // O
	that.health = options.totalHealth;       // O
	that.time = Date.now();
	that.death = false;
	that.type = "Enemy";
	that.enemyClass = options.enemyClass;
	if ( that.enemyClass == "Skeleton" ) {
		that.startWalk = 0;
		that.startDeath = 12;
		that.startAttack = 4; 
		that.moveAFrame = 9;
		that.deathAFrame = 6;
		that.attackAFrame = 6;	
		that.lengthX = 60;
		that.lengthY = 92;
		that.xOff = 40; //34
		that.yOff = 20; // 30
	}
	else if (that.enemyClass == "Wolf" ) {
		that.startWalk = 0;
		that.startAttack = 4; 
		that.moveAFrame = 8;
		that.attackAFrame = 5;	
		that.lengthX = 44;
		that.lengthY = 104;
		that.xOff = 42; //34
		that.yOff = 16; // 30
	}
	else if (that.enemyClass == "skeleKnight" ) {
		that.startWalk = 0;
		that.startAttack = 4; 
		that.moveAFrame = 8;
		that.attackAFrame = 5;	
		that.lengthX = 44;
		that.lengthY = 104;
		that.xOff = 42; //34
		that.yOff = 16; // 30
	}
	
	that.X = that.X + that.xOff;
	that.Y = that.Y + that.yOff;
	that.iBox = [that.X+(dx/8)*64,that.X+(dx/8)*64,that.Y+(dy/8)*64,that.Y+(dy/8)*64]; //x1,x2,y1,y2
	that.attackSpeed = 1000/10;
	that.moveSpeed = options.moveSpeed;
	
	//Call the draw function to create basic enemy rectangle
	that.draw = function() {
		if ( that.whichAction == "alive" || that.whichAction == "attack" ) {
			if ( that.health > 0 )
			  basicEnemyAI(that);
			else if ( that.health <= 0 && that.action != 12 && that.enemyClass == "Skeleton" ) {
		  	  that.action = 12;
			  that.aFrame = 0;
			  that.direction = 0;
			}
			else if ( that.enemyClass == "Skeleton" )
			  enemyDeath(that);
			else
			  that.whichAction = "dead";
		}
		if ( that.whichAction != "dead" && that.enemyClass == "Skeleton") {
			ctx.drawImage(enemyImage,64*Math.floor(that.aFrame),64*(that.direction+that.action),64,64,that.X+(dx/8)*64-that.xOff,that.Y+(dy/8)*64-that.yOff,128,128);
			drawHealth(that);
		}
		else if ( that.whichAction != "dead" && that.enemyClass == "Wolf") {
			ctx.drawImage(wolfImage,64*Math.floor(that.aFrame),64*(that.direction+that.action),64,64,that.X+(dx/8)*64-that.xOff,that.Y+(dy/8)*64-that.yOff,128,128);
			drawHealth(that);
		}
		else if ( that.whichAction != "dead" && that.enemyClass == "skeleKnight") {
			ctx.drawImage(skeleKnightImage,64*Math.floor(that.aFrame),64*(that.direction+that.action),64,64,that.X+(dx/8)*64-that.xOff,that.Y+(dy/8)*64-that.yOff,128,128);
			drawHealth(that);
			ctx.fillRect(that.iBox[0],that.iBox[2],(that.iBox[1]-that.iBox[0]),(that.iBox[3]-that.iBox[2]));
		}
	};
	
	//if enemy's health is 0, just dead
	that.checkDeath = function() {
		if ( that.health <= 0  ) {
			that.death = true;
			return true;
		}
		return false;
	};
	
	that.attack = function() { 
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
			Enemy.Y+=Enemy.moveSpeed;
			Enemy.direction = 2;
		}
		if ( Player.standDown < Enemy.Y + (dy/8)*64 + Enemy.lengthY) {
			Enemy.Y-=Enemy.moveSpeed;
			Enemy.direction = 0;
		}
	       if ( Player.standRight < Enemy.X +(dx/8)*64) {
			Enemy.X-=Enemy.moveSpeed;
		       if ( ((Enemy.X +(dx/8)*64 - Player.standRight) > (Player.standUp - Enemy.Y - (dy/8)*64)) && Enemy.direction == 2 )
				Enemy.direction = 1;
		     	else if ( ((Enemy.X +(dx/8)*64 - Player.standRight) > (Enemy.Y + (dy/8)*64 + Enemy.lengthY - Player.standDown )) && Enemy.direction == 0 )
				Enemy.direction = 1;
		}
		else if ( Player.standLeft > Enemy.X + (dx/8)*64 + Enemy.lengthX) {
			Enemy.X+=Enemy.moveSpeed;
			if ( ((Player.standLeft - Enemy.X - (dx/8)*64 - Enemy.lengthX) > (Player.standUp - Enemy.Y - (dy/8)*64)) && Enemy.direction == 2)
				Enemy.direction = 3;
		     	else if ( ((Player.standLeft - Enemy.X - (dx/8)*64 - Enemy.lengthX) > (Enemy.Y + (dy/8)*64 + Enemy.lengthY - Player.standDown )) && Enemy.direction == 0 )
				Enemy.direction = 3;
		}

	}
     if ( Enemy.enemyClass == "Skeleton" ) {
	if ( Enemy.direction == 0 ) {
		Enemy.iBox[0] = Enemy.X + (dx/8)*64;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64;
	  }
	else if ( Enemy.direction == 1 ) {
		Enemy.iBox[0] = Enemy.X + (dx/8)*64 - 10;
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
		Enemy.iBox[1] = Enemy.X + (dx/8)*64 + Enemy.lengthX + 11;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64 + 44;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + 66;	
          }
     }
    else if ( Enemy.enemyClass == "skeleKnight" ) { // update box
	 if ( Enemy.direction == 0 ) {
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.yOff = 32;
		Enemy.xOff = 34;
		Enemy.lengthX = 58;
		Enemy.lengthY = 90;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64;
	  }
	else if ( Enemy.direction == 1 ) {
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.yOff = 46;
		Enemy.xOff = 32;
		Enemy.lengthX = 38;
		Enemy.lengthY = 94;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64 - 28;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64 + 20;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + 36;
	  }
	else if ( Enemy.direction == 2 ) {
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.yOff = 32;
		Enemy.xOff = 34;
		Enemy.lengthX = 58;
		Enemy.lengthY = 90;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64;	
	  }
	else {
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.yOff = 46;
		Enemy.xOff = 32;
		Enemy.lengthX = 38;
		Enemy.lengthY = 94;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64 + Enemy.lengthX;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64 + Enemy.lengthX + 28;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64 + 20;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + 36;	
          } 
    }
    else if ( Enemy.enemyClass == "Wolf" ) {
	if ( Enemy.direction == 0 ) {
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.yOff = 16;
		Enemy.xOff = 42;
		Enemy.lengthX = 44;
		Enemy.lengthY = 104;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64 + Enemy.lengthX;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64 - 30;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64;
	  }
	else if ( Enemy.direction == 1 ) {
		Enemy.yOff = 42;
		Enemy.xOff = 0;
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.lengthX = 126;
		Enemy.lengthY = 54;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64 - 30;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + Enemy.lengthY;
	  }
	else if ( Enemy.direction == 2 ) {
		Enemy.yOff = 8;
		Enemy.xOff = 42;
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.lengthX = 44;
		Enemy.lengthY = 104;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64 + Enemy.lengthY;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64 + Enemy.lengthY;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + Enemy.lengthY + 30;	
	  }
	else {
		Enemy.yOff = 42;
		Enemy.xOff = 0;
		Enemy.X -= Enemy.xOff;
		Enemy.Y -= Enemy.yOff;
		Enemy.lengthX = 126;
		Enemy.lengthY = 54;
		Enemy.X += Enemy.xOff;
		Enemy.Y += Enemy.yOff;
		Enemy.iBox[0] = Enemy.X + (dx/8)*64 + Enemy.lengthX;
		Enemy.iBox[1] = Enemy.X + (dx/8)*64 + Enemy.lengthX + 30;
		Enemy.iBox[2] = Enemy.Y + (dy/8)*64;
		Enemy.iBox[3] = Enemy.Y + (dy/8)*64 + Enemy.lengthY;	
          }
        
    }
	Enemy.aFrame++;
		if ( Enemy.aFrame == Enemy.moveAFrame )
			Enemy.aFrame = 0;
	
	if ( collisionSquare(Enemy.iBox[0],Enemy.iBox[1],Enemy.iBox[2],Enemy.iBox[3],Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true ) 
		Enemy.attack();
	
   }
   else if ( Enemy.whichAction == "attack" && Enemy.enemyClass == "Skeleton" ) {
	if ( Enemy.aFrame == 3 ) {
		if ( Enemy.direction == 1 ) {
		   if ( collisionSquare(Enemy.X+(dx/8)*64-28,Enemy.X+(dx/8)*64,Enemy.Y+(dy/8)*64+40,Enemy.Y+(dy/8)*64+72,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )  
			Player.isDamaged = true;
		}
		else if ( Enemy.direction == 3 ) {
		   if  ( collisionSquare(Enemy.X+Enemy.lengthX+(dx/8)*64,Enemy.X+Enemy.lengthX+(dx/8)*64+28,Enemy.Y+(dy/8)*64+40,Enemy.Y+(dy/8)*64+72,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true ) 
			Player.isDamaged = true;
		}
	}
	else if ( Enemy.aFrame == 4 ) {
		if ( Enemy.direction == 1 ) {
		   if ( collisionSquare(Enemy.X+(dx/8)*64-28,Enemy.X+(dx/8)*64,Enemy.Y+(dy/8)*64+30,Enemy.Y+(dy/8)*64+48,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
			   Player.isDamaged = true;
		}
		else if ( Enemy.direction == 3 ) {
		   if  ( collisionSquare(Enemy.X+Enemy.lengthX+(dx/8)*64,Enemy.X+Enemy.lengthX+(dx/8)*64+28,Enemy.Y+(dy/8)*64+30,Enemy.Y+(dy/8)*64+48,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
			   Player.isDamaged = true;
		}	
	}
	else if ( Enemy.aFrame == 5 ) {
		if ( Enemy.direction == 1 ) {
		   if ( collisionSquare(Enemy.X+(dx/8)*64-28,Enemy.X+(dx/8)*64,Enemy.Y+(dy/8)*64+28,Enemy.Y+(dy/8)*64+48,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
			   Player.isDamaged = true;
		}
		else if ( Enemy.direction == 3 ) {
		   if  ( collisionSquare(Enemy.X+Enemy.lengthX+(dx/8)*64,Enemy.X+Enemy.lengthX+(dx/8)*64+28,Enemy.Y+(dy/8)*64+28,Enemy.Y+(dy/8)*64+48,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
			   Player.isDamaged = true;
		}	
	}
   }
   else if ( Enemy.whichAction == "attack" && Enemy.enemyClass == "skeleKnight" ) {
	if ( Enemy.aFrame == 3 ) {
		if ( Enemy.direction == 1 && collisionSquare(Enemy.X+(dx/8)*64-28,Enemy.X+(dx/8)*64,Enemy.Y+(dy/8)*64+20,Enemy.Y+(dy/8)*64+36,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
		   Player.isDamaged == true;
		else if ( Enemy.direction == 3 && collisionSquare(Enemy.X+(dx/8)*64+Enemy.lengthX,Enemy.X+(dx/8)*64+Enemy.lengthX+28,Enemy.Y+(dy/8)*64-36,Enemy.Y+(dy/8)*64-20,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
		   Player.isDamaged == true;
	}
	else if ( Enemy.aFrame == 4 ) {
		if ( Enemy.direction == 1 && collisionSquare(Enemy.X+(dx/8)*64-40,Enemy.X+(dx/8)*64,Enemy.Y+(dy/8)*64+15,Enemy.Y+(dy/8)*64+24,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
		   Player.isDamaged == true;
		else if ( Enemy.direction == 3 && collisionSquare(Enemy.X+(dx/8)*64+Enemy.lengthX,Enemy.X+(dx/8)*64+Enemy.lengthX+40,Enemy.Y+(dy/8)*64-24,Enemy.Y+(dy/8)*64-15,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
		   Player.isDamaged == true;
	}
	else if ( Enemy.aFrame == 5 ) {
		if ( Enemy.direction == 1 && collisionSquare(Enemy.X+(dx/8)*64-38,Enemy.X+(dx/8)*64,Enemy.Y+(dy/8)*64+14,Enemy.Y+(dy/8)*64+23,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
		   Player.isDamaged == true;
		else if ( Enemy.direction == 3 && collisionSquare(Enemy.X+(dx/8)*64+Enemy.lengthX,Enemy.X+(dx/8)*64+Enemy.lengthX+38,Enemy.Y+(dy/8)*64-23,Enemy.Y+(dy/8)*64-14,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
		   Player.isDamaged == true;			
	}
   }
   else if ( Enemy.whichAction == "attack" && Enemy.enemyClass == "Wolf" ) {
	if ( Enemy.aFrame == 3 ) {
		
		if ( Enemy.direction == 0 )
			Enemy.Y-=20;
		else if ( Enemy.direction == 1 ) {
			Enemy.X-=25;
			Enemy.Y-=10;	
		}
		else if ( Enemy.direction == 2 )
			Enemy.Y+=20;
		else  {
			Enemy.X+=25;
			Enemy.Y-=10;
		}
		if ( collisionSquare(Enemy.X,Enemy.X+Enemy.lengthX,Enemy.Y,Enemy.Y+Enemy.lengthY,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
			Player.isDamaged == true;
	}
   	else if ( Enemy.aFrame == 4 ) {
		if ( Enemy.direction == 0 )
			Enemy.Y-=10;
		else if ( Enemy.direction == 1 ) {
			Enemy.X-=20;
			Enemy.Y-=10;
		}
		else if ( Enemy.direction == 2 )
			Enemy.Y+=10;
		else {
			Enemy.X+=20;
			Enemy.Y-=10;
		}
		if ( collisionSquare(Enemy.X,Enemy.X+Enemy.lengthX,Enemy.Y,Enemy.Y+Enemy.lengthY,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
			Player.isDamaged == true;
	}
	else if ( Enemy.aFrame == 5 ) {
		if ( collisionSquare(Enemy.X,Enemy.X+Enemy.lengthX,Enemy.Y,Enemy.Y+Enemy.lengthY,Player.standLeft,Player.standRight,Player.standUp,Player.standDown) == true )
			Player.isDamaged == true;
		if ( Enemy.direction == 1 )
			Enemy.Y+=20;
		else if ( Enemy.direction == 3 )
			Enemy.Y+=20;
	}

   }
}

function enemyDeath(Enemy) {
	Enemy.aFrame+=1/10;
	if ( Enemy.aFrame >= Enemy.deathAFrame ) {
		Enemy.aFrame = 0;
		Enemy.whichAction = "dead";
	}
	
}
