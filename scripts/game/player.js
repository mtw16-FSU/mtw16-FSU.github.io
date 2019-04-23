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
	that.isDamaged = false;
	that.death = false;
	
	// x1,x2,y1,y2
	that.iBox = [that.X+105,that.X+135,that.Y+57,that.Y+88];
	
	that.draw = function() {
		ctx.drawImage(that.image,63*that.aFrame,63*(action+that.direction),63,63,that.X,that.Y,126,126);
		ctx.fillRect(that.iBox[0],that.iBox[2],30,31);
	};
	
	that.moveCheck = function(Up,Down,Left,Right,width,height) {
	 if ( that.whichAction == "stand" ) {
		if (!up && Up && that.Y-5 >= -28) {
			that.Y-=5;
			that.iBox[2]-=5;
			that.iBox[3]-=5;
		}
		if (!down && Down && that.Y+5 <= height-128) {
			that.Y+=5;
			that.iBox[2]+=5;
			that.iBox[3]+=5;
		}
		if (!left && Left && that.X-5 >= -28) {
			that.X-=5;
			that.iBox[0]-=5;
			that.iBox[1]-=5;
		}
		if (!right && Right && that.X+5 <= width-100) {
			that.X+=5;
			that.iBox[0]+=5;
			that.iBox[1]+=5;
		}
			
		if (Right)
			that.direction = 3;
		else if (Left) 
			that.direction = 1;
		else if (Down)
			that.direction = 2;
		else if (Up)
			that.direction = 0;
		
		changeIBox(that.direction,that.iBox,that.X,that.Y); 
		 
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
	
	that.canDamage = function() {
		Player.isDamaged = false;	
	}
	
	that.collisionCheck = function(Enemy) {
		// Check X collision
		if ( Player.isDamaged == true ) 
			return;
		if ( that.standRight >= Enemy.X+((dx/8)*64) && that.standLeft <= Enemy.X+((dx/8)*64)+Enemy.lengthX && Enemy.death == false ) {
			// Check Y collision
			if ( that.standDown >= Enemy.Y+((dy/8)*64) && that.standUp <= Enemy.Y + ((dy/8)*64) + Enemy.lengthY) {
				Player.health -= 20;
				dx -= 32;
				dy -= 32;
				pLeft = false;
				pRight = false;
				pUp = false;
				pDown = false;
				up = false;
				left = false;
				right = false;
				down = false;
				Player.aFrame = 0;
				Player.whichAction = "stand";
				action = startWalk;
				Player.isDamaged = true;
				setTimeout(Player.canDamage,3000);
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

function changeIBox(dir,iBox,X,Y) {
	if ( dir == 0 ) { // up
		iBox[0] = X+50;
		iBox[1] = X+80;
		iBox[2] = Y-16;
		iBox[3] = Y+15;
	}
	else if ( dir == 1 ) { // left
		iBox[0] = X-15;
		iBox[1] = X+25;
		iBox[2] = Y+57;
		iBox[3] = Y+88;	
	}
	else if ( dir == 2 ) { // down 
		iBox[0] = X+50;
		iBox[1] = X+80;
		iBox[2] = Y+140;
		iBox[3] = Y+171;
	}
	else { // right 
		iBox[0] = X+105;
		iBox[1] = X+135;
		iBox[2] = Y+57;
		iBox[3] = Y+88;
	}
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

// Collision with sword and an enemy
function collisionBetter(theX,theY,Enemy) {
	if ( theX >= Enemy.X+((dx/8)*64) && theX <= Enemy.X+((dx/8)*64)+Enemy.lengthX && theY >= Enemy.Y+((dy/8)*64) && theY <=Enemy.Y+((dy/8)*64)+Enemy.lengthY )
		return true;
		// y = +/- sqrt(r^2 - (x-h)^2) + k
	y1 = Math.sqrt(225-((Enemy.X+((dx/8)*64)-theX)*(Enemy.X+((dx/8)*64)-theX))) + theY;
	y2 = -Math.sqrt(225-((Enemy.X+((dx/8)*64)-theX)*(Enemy.X+((dx/8)*64)-theX))) + theY;
	if ( y1 >= Enemy.Y+((dy/8)*64) && y1 <= Enemy.Y+((dy/8)*64)+Enemy.lengthY )
		return true;
	else if ( y2 >= Enemy.Y+((dy/8)*64) && y2 <= Enemy.Y+((dy/8)*64)+Enemy.lengthY)
		return true;
	
	y1 = Math.sqrt(225-((Enemy.X+((dx/8)*64)+Enemy.lengthX-theX)*(Enemy.X+((dx/8)*64)+Enemy.lengthX-theX))) + theY;
	y2 = -Math.sqrt(225-((Enemy.X+((dx/8)*64)+Enemy.lengthX-theX)*(Enemy.X+((dx/8)*64)+Enemy.lengthX-theX))) + theY;	
	if ( y1 >= Enemy.Y+((dy/8)*64) && y1 <= Enemy.Y+((dy/8)*64)+Enemy.lengthY )
		return true;
	else if ( y2 >= Enemy.Y+((dy/8)*64) && y2 <= Enemy.Y+((dy/8)*64)+Enemy.lengthY)
		return true;
	
		// x = +/- sqrt(r^2 - (y-k)^2) + h
	x1 = Math.sqrt(225-((Enemy.Y+((dy/8)*64)-theY)*(Enemy.Y+((dy/8)*64)-theY))) + theX;
	x2 = -Math.sqrt(225-((Enemy.Y+((dy/8)*64)-theY)*(Enemy.Y+((dy/8)*64)-theY))) + theX;

	if ( x1 >= Enemy.X+((dx/8)*64) && x1 <= Enemy.X+((dx/8)*64)+Enemy.lengthX )
		return true;
	else if ( x2 >= Enemy.X+((dx/8)*64) && x2 <= Enemy.X+((dx/8)*64)+Enemy.lengthX )
		return true;

	x1 = Math.sqrt(225-((Enemy.Y+((dy/8)*64)+Enemy.lengthY-theY)*(Enemy.Y+((dy/8)*64)+Enemy.lengthY-theY))) + theX;
	x2 = -Math.sqrt(225-((Enemy.Y+((dy/8)*64)+Enemy.lengthY-theY)*(Enemy.Y+((dy/8)*64)+Enemy.lengthY-theY))) + theX;

	if ( x1 >= Enemy.X+((dx/8)*64) && x1 <= Enemy.X+((dx/8)*64)+Enemy.lengthX )
		return true;
	else if ( x2 >= Enemy.X+((dx/8)*64) && x2 <= Enemy.X+((dx/8)*64)+Enemy.lengthX )
		return true;

	return false;
}

// Collision that deals with squares
function collisionInteraction(pX1,pX2,pY1,pY2,oX1,oX2,oY1,oY2) {
	if ( pX1 >= oX1 && pX2 <= oX2 && pY1 >= oY1 && pY2 <= oY2 )
		return true;
	
	if ( pX1 >= oX1 && pX1 <= oX2 && oY1 <= pY2 && oY2 >= pY1) // pX1 collision
		return true;
	else if ( pX2 >= oX1 && pX2 <= oX2 && oY1 <= pY2 && oY2 >= pY1 ) // pX2 collision
		return true;
	else if ( pY1 >= oY1 && pY1 <= oY2 && oX1 <= pX2 && oX2 >= pX1 ) // pY1 collision
		return true;
	else if ( pY2 >= oY1 && pY2 <= oY2 && oX1 <= pX2 && oX2 >= pX1 ) // pY2 collision
		return true;
  	return false;
}

function animateAttack(that) {
   if ( that.whichAction == "attack" ) {
	that.aFrame++;
	if ( that.aFrame == swordAFrame ) {
		that.aFrame = 0;
		that.whichAction = "stand";
		action = startWalk;
	}
	else 
		setTimeout(animateAttack,1000/24,that); 
   }
}

