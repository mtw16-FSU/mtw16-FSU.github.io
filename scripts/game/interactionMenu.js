function initIMenu(i) {
	printText = -1;
	Villagers[i].drawText = true;
	document.onkeydown = null;
	document.onkeyup = null;
	document.onkeydown = iMenuHandler;
	for ( j = 0; j < Enemies.length; j++ ) {
		if ( Enemies[j].death == false )
		Enemies[j].whichAction = "listen";
	}
	Player.whichAction = "listen";
  options = ["Interact","Shop","Exit"];
  currentOption = 0;
}

function drawIMenu() {
  ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(width*.10,height*(.90-.10*options.length),width*.80,height*(.10*options.length));
	ctx.font = "60px Sniglet";
  
  for ( i = 0; i < options.length; i++ ) {
      if ( currentOption == i )
         ctx.fillStyle = "red";
      else 
         ctx.fillStyle = "black"
	   ctx.fillText(options[i],width*.11,height*(.70+0.8*i));
	}
}

function iMenuHandler(event) {
   keyCode = event.which || event.keyCode;
    switch(keyCode) {
	    case 13: // enter
        if ( currentOption == 0 ) { // interact 
          initTextBox();
        }
        else if ( currentOption == 1 ) { // shop 
          // shop stuff here   
        }
        else if  ( currentOption == 2 ) { // exit 
          document.onkeydown = null;
          for ( i = 0; i < Villagers.length; i++ )
            Villagers[i].drawText = false;
          document.onkeydown = levelHandler;
          document.onkeyup = levelHandler2;
          for ( i = 0; i < Enemies.length; i++ ) {
            if ( Enemies[i].death == false )
              Enemies[i].whichAction = "alive";
          }
          Player.whichAction = "stand";
        } 
        break;
     case 38: // up
        if ( currentOption == 0 )
          currentOption = options.length-1;
        else 
          currentOption--;
        break;
	    case 40: // down
        if ( currentOption == options.length-1 )
          currentOption = 0;
        else
          currentOption++;
        break;
      default:
        break;
    }
}
