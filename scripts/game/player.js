var playerImage = new Image();
playerImage.src = "images/spritesheets/playertest.png";

function initPlayer(options) {
	var that = {};
	
	that.X = options.X;
	that.Y = options.Y;
	that.aFrame = options.aFrame;
    that.image = playerImage;

	that.draw = function(ctx) {
		ctx.drawImage(that.image,256*that.aFrame,0,256,256,that.X,that.Y,256,256);
	};
	
	that.moveCheck = function(Up,Down,Left,Right) {
		if (Up)
			that.Y-=5;
		if (Down)
			that.Y+=5;
		if (Left)
			that.X-=5;
		if (Right)
			that.X+=5;
		
		if (Up || Down || Right || Left ) {
			that.aFrame++;
			if ( that.aFrame > 5)
				that.aFrame = 0;
		}
		else
			that.aFrame = 0;
			
	};
	
	return that;
}
