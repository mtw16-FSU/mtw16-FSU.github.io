var enemyImage= new Image();
enemyImage.src = "images/spritesheets/skeleton_sprites.png";

function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.X = 500;
	that.Y = 300;
	that.health = 100;
	that.length = 100;
	that.death = false;
	
	//Call the draw function to create basic enemy rectangle
	that.draw = function(ctx) {
		if ( that.death == false ) {
			ctx.drawImage(enemyImage,0,128,64,64,that.X,that.Y,128,128);
		}
	};
	
	//if enemy's health is 0, just dead
	that.checkDeath = function() {
		if ( that.health <= 0 )
			that.death = true;
	};
	
	return that;
}
