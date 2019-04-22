

function initVillager(options) {
  var that = {};
  that.startX = 2000;
  that.startY = 1000;
  that.endX = 2100;
  that.endY = 1100;

  that.draw = function() {
    ctx.fillStyle = "#FF0000";
    that.startX = that.startX + (dx/8)*64;
    that.endX = that.startX + 100;
    that.startY = that.startY + (dy/8)*64;
    that.endY = that.startY + 100;
    ctx.fillRect(that.startX,that.startY,100,100);
  };
  
  that.interaction = function(options) {
    // Call text box and insert string into it
  };
  
  return that;
}
