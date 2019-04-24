var villagerImage = new Image();
villagerImage.src = "images/spritesheets/villager.png";

function initVillager(options) {
  var that = {};
  that.startX = 2000+17;
  that.startY = 1000+14; 
  that.endX = 2047;
  that.endY = 1062;
  that.drawText = false;
  that.sentence = "1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 ";
  
  that.draw = function() {
    ctx.drawImage(villagerImage,0,128,64,64,that.startX-17+(dx/8)*64-40,that.startY-14+(dy/8)*64-20,128,128);
    that.endX = that.startX + (dx/8)*64 + 100;
    that.endY = that.startY + (dy/8)*64 + 100; 
  };
  
  that.interaction = function(options) {
    // Call text box and insert string into it
  };
  
  return that;
}
