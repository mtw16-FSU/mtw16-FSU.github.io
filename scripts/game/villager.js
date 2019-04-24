var villagerImage = new Image();
villagerImage.src = "images/spritesheets/villager.png";

function initVillager(options) {
  var that = {};
  that.xOff = 17;
  that.yOff = 14;
  that.xLength = 30;
  that.yLength = 48;
  that.startX = 2000+that.xOff;
  that.startY = 1000+that.yOff; 
  that.endX = that.startX+that.xLength;
  that.endY = that.startY+that.yLength;
  that.drawText = false;
  that.sentence = "1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 ";
  
  that.draw = function() {
    ctx.drawImage(villagerImage,0,128,64,64,that.startX-that.xOff+(dx/8)*64-40,that.startY-that.yOff+(dy/8)*64-20,128,128);
    that.endX = that.startX + (dx/8)*64;
    that.endY = that.startY + (dy/8)*64; 
  };
  
  that.interaction = function(options) {
    // Call text box and insert string into it
  };
  
  return that;
}
