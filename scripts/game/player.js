var playerImage = new Image();
playerImage.src = "maps/character.png";

var moveAFrame = 9;
var swordAFrame = 6;
var startWalk = 8;
var startSword = 12;
var action = startWalk;

function initPlayer(options) {
	var that = {};
	
	that.X = options.X;
	that.Y = options.Y;
	that.aFrame = options.aFrame;
	that.whichAction = "stand";
	that.direction = 3;  // 0 = up, 1 = left, 2 = down, 3 = right
    that.image = playerImage;
	that.standRight = that.X + 90;
	that.standLeft = that.X +40;
	that.standUp = that.Y + 20;
	that.standDown = that.Y + 125;
	that.health = 100;
	that.weapon = "shortSword";
	
	that.draw = function(ctx) {
		ctx.drawImage(that.image,63*that.aFrame,63*(action+that.direction),63,63,that.X,that.Y,126,126);
	//	ctx.fillStyle = "#00FF00";
	//	ctx.fillRect(that.X+13,that.Y+63,5,5);
	};
	
	that.moveCheck = function(Up,Down,Left,Right,width,height) {
	 if ( that.whichAction == "stand" ) {
		if (Up && that.Y-5 >= -28)
			that.Y-=5;
		if (Down && that.Y+5 <= height-128)
			that.Y+=5;
		if (Left && that.X-5 >= -28)
			that.X-=5;
		if (Right && that.X+5 <= width-100) 
			that.X+=5;
			
		if (Right) 
			that.direction = 3;
		else if (Left) 
			that.direction = 1;
		else if (Down)
			that.direction = 2;
		else if (Up)
			that.direction = 0;
		
		if ( Up || Right || Down || Left ) {
			that.aFrame++;
			if ( that.aFrame == 9 )
				that.aFrame = 0;
		
		that.standRight = that.X + 90;
		that.standLeft = that.X +40;
		that.standUp = that.Y + 20;
		that.standDown = that.Y + 125;		
			
		}
		else
			that.aFrame = 0;
	 }
	};
	
	that.attack = function() {
		that.whichAction = "attack";
		action = startSword;
		that.aFrame = -1;
		setTimeout(animateAttack,0,that)
	};
	
	that.collisionCheck = function(Enemy) {
		// Check X collision
		if ( that.standRight >= Enemy.X && that.standLeft <= Enemy.X+Enemy.length ) {
			// Check Y collision
			if ( that.standDown >= Enemy.Y && that.standUp <= Enemy.Y + Enemy.length) {
			}
		}
		
		if ( swordCollision(that,Enemy) == true && Enemy.death == false ) {
			Enemy.health -= 20;
			Enemy.checkDeath();
			if ( Enemy.death == false )
				alert(Enemy.health);
			else
				alert("Enemy Dead");
		}
	};
	
	return that;
}

function swordCollision(that,Enemy) {
	if ( that.aFrame == 3 && that.whichAction == "attack" ) {
		 if ( that.direction == 1 ) {
			  theX = that.X+22;
			  theY = that.Y+95;
		}
		else if ( that.direction == 3 ) {
			  theX = that.X-22+126;
			  theY = that.Y+95;
		}
		else
			  return false;
		  
		return collisionMath(theX,theY,Enemy);
	}
	else if ( that.aFrame == 4 && that.whichAction == "attack" ) {
		if ( that.direction == 1 ) {
			theX = that.X+10
			theY = that.Y+68;
		}
		else if ( that.direction == 3 ) {
			theX = that.X-10+126;
			theY = that.Y+68;
		}
		else	
			return false;
		
		return collisionMath(theX,theY,Enemy);
	}
	else if ( that.aFrame == 5 && that.whichAction == "attack" ) {
		if ( that.direction == 1 ) {
			theX = that.X +13;
			theY = that.Y +63;
		}
		else if ( that.direction == 3 ) {
			theX = that.X-13+126;
			theY = that.Y+63;
		}
		else 
			return false;
		
		return collisionMath(theX,theY,Enemy);
	}

	return false;
}

function collisionMath(theX,theY,Enemy) {
	  if ( theX <=Enemy.X+Enemy.length && theX >=Enemy.X){
		 if ( theY <= Enemy.Y+Enemy.length && theY>=Enemy.Y)
			return true;
		 else {
			if ( Math.abs(theY - Enemy.Y) < Math.abs(theY-Enemy.Y-Enemy.length))
				y = Math.abs(theY-Enemy.Y);
			else	
				y = Math.abs(theY-Enemy.Y-Enemy.length);
			
			if ( Math.sqrt(y*y) <= 30 )
				return true;
		}
	  }
	 else if ( theY <= Enemy.Y+Enemy.length && theY >= Enemy.Y ) {
		if ( Math.abs(theX - Enemy.X) < Math.abs(theX - Enemy.X - Enemy.length))
			x = Math.abs(theX -Enemy.X);
		else
			x = Math.abs(theX-Enemy.X-Enemy.length);
		
		if ( Math.sqrt(x*x) <= 15 )
			return true;
	  }	
	else if ( theX > Enemy.X+Enemy.length || theX < Enemy.X ){
		if ( Math.abs(theX - Enemy.X) < Math.abs(theX - Enemy.X - Enemy.length))
			x = Math.abs(theX -Enemy.X);
		else
			x = Math.abs(theX-Enemy.X-Enemy.length);
		
		if ( Math.abs(theY - Enemy.Y) < Math.abs(theY-Enemy.Y-Enemy.length))
			y = Math.abs(theY-Enemy.Y);
		else	
			y = Math.abs(theY-Enemy.Y-Enemy.length);
	
		if ( Math.sqrt(x*x + y*y) <= 30 )
			return true;
	  }
	
	return false;
	
}

function animateAttack(that) {
	that.aFrame++;
	if ( that.aFrame == swordAFrame ) {
		that.aFrame = 0;
		that.whichAction = "stand";
		action = startWalk;
	}
	else 
		setTimeout(animateAttack,1000/24,that);
}

