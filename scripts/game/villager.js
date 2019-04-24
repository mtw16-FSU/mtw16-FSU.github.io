var villagerImage = new Image();
villagerImage.src = "images/spritesheets/villager.png";

function initVillager(options) {
  var that = {};
  that.xLength = 60;
  that.yLength = 96;
  that.startX = options.X; // O 
  that.startY = options.Y; // O
  that.endX = that.startX+that.xLength;
  that.endY = that.startY+that.yLength;
  that.drawText = false;
  that.sentence = options.sentence; // O
  
  that.draw = function() {
    ctx.drawImage(villagerImage,0,128,64,64,that.startX+(dx/8)*64-40,that.startY+(dy/8)*64-20,128,128);
    that.endX = that.startX + (dx/8)*64+that.xLength;
    that.endY = that.startY + (dy/8)*64+that.yLength;
  };
  
  that.interaction = function(options) {
    // Call text box and insert string into it
  };
  
  return that;
}

function textInteraction(Villager) {
 if ( Villager.drawText == false )
   return false;
  else
    return true;
}
