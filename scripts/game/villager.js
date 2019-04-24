var villagerImage = new Image();
villagerImage.src = "images/spritesheets/villager.png";

function initVillager(options) {
  var that = {};
  that.xLength = 60;
  that.yLength = 96;
  that.X = options.X; // O 
  that.Y = options.Y; // O
  that.endX = that.X+that.xLength;
  that.endY = that.Y+that.yLength;
  that.drawText = false;
  that.sentence = options.sentence; // O
  
  that.draw = function() {
    ctx.drawImage(villagerImage,0,128,64,64,that.X+(dx/8)*64-40,that.Y+(dy/8)*64-20,128,128);
    that.endX = that.X + (dx/8)*64+that.xLength;
    that.endY = that.Y + (dy/8)*64+that.yLength;
  };
  
  that.interaction = function(options) {
    // Call text box and insert string into it
  };
  
  return that;
}
