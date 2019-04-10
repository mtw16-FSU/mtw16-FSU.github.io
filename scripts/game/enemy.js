function initEnemy(options) {
	var that = {};
	//initialize Enemy variables
	that.X = 500;
	that.Y = 300;
	that.health = 100;
	that.length = 252;
	that.death = false;
	
	//Call the draw function to create basic enemy rectangle
	that.draw = function(ctx) {
		if ( that.death == false ) {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(500,300,that.length,that.length); 
		}
	};
	
	//if enemy's health is 0, just dead
	that.checkDeath = function() {
		if ( that.health <= 0 )
			that.death = true;
	};
	
	return that;
}