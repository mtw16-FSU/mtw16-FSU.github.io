var villagerImage = new Image();
villagerImage.src = "images/spritesheets/villager.png";

function initVillager(options) {
  var that = {};
  that.xLength = 60;
  that.yLength = 96;
  that.startX = 2000;
  that.startY = 1000; 
  that.endX = that.startX+that.xLength;
  that.endY = that.startY+that.yLength;
  that.drawText = false;
  that.sentence = "My Lord! The prophecies heralded your return. Your path to take back your throne begins now, sire. Your rivals stand in your way, once you defeat them, you may leave this province in the top right and head towards the castle!";
  
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
