var playerImage = new Image();
playerImage.src = "maps/character.png";

var moveAFrame = 9;
var swordAFrame = 6;
var startWalk = 8;
var startSword = 12;
var action = startWalk;
var tempInt = 0;

function initPlayer(options) {
	var that = {};
	
	that.X = options.X;
	that.Y = options.Y;
	that.aFrame = options.aFrame;
	that.whichAction = "stand";
	that.direction = 3;  // 0 = up, 1 = left, 2 = down, 3 = right
    that.image = playerImage;
	that.health = 100;
	that.weapon = "shortSword";
	
	
	that.draw = function(ctx) {
		ctx.drawImage(that.image,63*that.aFrame,63*(action+that.direction),63,63,that.X,that.Y,126,126);
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
			
		}
		else
			that.aFrame = 0;
	 }
	 else if ( that.whichAction == "attack" ) {
		tempInt += 0.5;
		that.aFrame = Math.floor(tempInt);
		if ( Math.floor(tempInt) == swordAFrame ) {
			that.aFrame = 0;
			that.whichAction = "stand";
			action = startWalk;
			tempInt = 0;
		}
	 } 
	};
	
	that.attack = function() {
		that.whichAction = "attack";
		action = startSword;
		tempInt = -0.5;
		that.aFrame = 0;
	}
	
	return that;
}


/*
	Weapons:
		sprites
		damage
		collison
*/
