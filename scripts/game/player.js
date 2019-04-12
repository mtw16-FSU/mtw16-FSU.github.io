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
	that.death = false;
	
	that.draw = function() {
		ctx.drawImage(that.image,63*that.aFrame,63*(action+that.direction),63,63,that.X,that.Y,126,126);
	};
	
	that.moveCheck = function(Up,Down,Left,Right,width,height) {
	 if ( that.whichAction == "stand" ) {
		if (!up && Up && that.Y-5 >= -28)
			that.Y-=5;
		if (!down && Down && that.Y+5 <= height-128)
			that.Y+=5;
		if (!left && Left && that.X-5 >= -28)
			that.X-=5;
		if (!right && Right && that.X+5 <= width-100) 
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
		if ( that.standRight >= Enemy.X+((dx/8)*64) && that.standLeft <= Enemy.X+((dx/8)*64)+Enemy.length && Enemy.death == false ) {
			// Check Y collision
			if ( that.standDown >= Enemy.Y+((dy/8)*64) && that.standUp <= Enemy.Y + ((dy/8)*64) + Enemy.length) {
				/*Player.health -= 20;
				dx -= 32;
				dy -= 32;
				pLeft = false;
				pRight = false;
				pUp = false;
				pDown = false;
				*/
				alert("YOU TOUCH MR.BONES");
				if(Player.health <= 0){
					this.health = 120;
					this.death = true;
				}
			}
		}
		
		if ( swordCollision(that,Enemy) == true && Enemy.death == false ) {
			Enemy.health -= 20;
			Enemy.checkDeath();
			//alert(Enemy.health);
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
		  
		return collisionBetter(theX,theY,Enemy);
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
		
		return collisionBetter(theX,theY,Enemy);
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
		
		return collisionBetter(theX,theY,Enemy);
	}

	return false;
}

function collisionBetter(theX,theY,Enemy) {
	if ( theX >= Enemy.X+((dx/8)*64) && theX <= Enemy.X+((dx/8)*64)+Enemy.length && theY >= Enemy.Y+((dy/8)*64) && theY <=Enemy.Y+((dy/8)*64)+Enemy.length )
		return true;
		// y = +/- sqrt(r^2 - (x-h)^2) + k
	y1 = Math.sqrt(225-((Enemy.X+((dx/8)*64)-theX)*(Enemy.X+((dx/8)*64)-theX))) + theY;
	y2 = -Math.sqrt(225-((Enemy.X+((dx/8)*64)-theX)*(Enemy.X+((dx/8)*64)-theX))) + theY;
	if ( y1 >= Enemy.Y+((dy/8)*64) && y1 <= Enemy.Y+((dy/8)*64)+Enemy.length )
		return true;
	else if ( y2 >= Enemy.Y+((dy/8)*64) && y2 <= Enemy.Y+((dy/8)*64)+Enemy.length)
		return true;
	
	y1 = Math.sqrt(225-((Enemy.X+((dx/8)*64)+Enemy.length-theX)*(Enemy.X+((dx/8)*64)+Enemy.length-theX))) + theY;
	y2 = -Math.sqrt(225-((Enemy.X+((dx/8)*64)+Enemy.length-theX)*(Enemy.X+((dx/8)*64)+Enemy.length-theX))) + theY;	
	if ( y1 >= Enemy.Y+((dy/8)*64) && y1 <= Enemy.Y+((dy/8)*64)+Enemy.length )
		return true;
	else if ( y2 >= Enemy.Y+((dy/8)*64) && y2 <= Enemy.Y+((dy/8)*64)+Enemy.length)
		return true;
	
		// x = +/- sqrt(r^2 - (y-k)^2) + h
	x1 = Math.sqrt(225-((Enemy.Y+((dy/8)*64)-theY)*(Enemy.Y+((dy/8)*64)-theY))) + theX;
	x2 = -Math.sqrt(225-((Enemy.Y+((dy/8)*64)-theY)*(Enemy.Y+((dy/8)*64)-theY))) + theX;

	if ( x1 >= Enemy.X+((dx/8)*64) && x1 <= Enemy.X+((dx/8)*64)+Enemy.length )
		return true;
	else if ( x2 >= Enemy.X+((dx/8)*64) && x2 <= Enemy.X+((dx/8)*64)+Enemy.length )
		return true;

	x1 = Math.sqrt(225-((Enemy.Y+((dy/8)*64)+Enemy.length-theY)*(Enemy.Y+((dy/8)*64)+Enemy.length-theY))) + theX;
	x2 = -Math.sqrt(225-((Enemy.Y+((dy/8)*64)+Enemy.length-theY)*(Enemy.Y+((dy/8)*64)+Enemy.length-theY))) + theX;

	if ( x1 >= Enemy.X+((dx/8)*64) && x1 <= Enemy.X+((dx/8)*64)+Enemy.length )
		return true;
	else if ( x2 >= Enemy.X+((dx/8)*64) && x2 <= Enemy.X+((dx/8)*64)+Enemy.length )
		return true;

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

