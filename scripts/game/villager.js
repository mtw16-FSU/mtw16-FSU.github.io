

function initVillager(options) {
  var that = {};
  that.startX = 2000;
  that.startY = 1000;
  that.endX = 2050;
  that.endY = 1050;

  that.draw = function() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(that.startX,that.startY,50,50);
  };
  
  that.interaction = function(options) {
    // Call text box and insert string into it
  };
  
  return that;
}
