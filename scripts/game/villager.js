

function initVillager(options) {
  var that = {};
  that.startX = 2000;
  that.startY = 1000;
  that.endX = 2100;
  that.endY = 1100;
  that.drawText = false;
  that.sentence = "I am a villager";
  
  that.draw = function() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(that.startX + (dx/8)*64,that.startY+(dy/8)*64,100,100);
    that.endX = that.startX + (dx/8)*64 + 100;
    that.endY = that.startY + (dy/8)*64 + 100; 
  };
  
  that.interaction = function(options) {
    // Call text box and insert string into it
  };
  
  return that;
}
