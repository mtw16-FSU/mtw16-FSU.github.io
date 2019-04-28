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
  if ( Player.drawInv == true ) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(width*.10,height*(.90-.075*(Math.ceil(options.length/2)+4),width*.80,height*(.075*(Math.ceil(options.length/2)+4);
    ctx.font = "45px Sniglet";
  
    var j = 0;
    for(i = 0; i < options.length; i+=2 ){
	ctx.fillStyle = "black";
	if ( i == 0 ) {
  	   ctx.fillText("Weapons",width*.11,height*((.90-.075*options.length+0.08)+0.08*(i/2 + j)));	    
    	   j++;
    	}
	if ( options[i] == "potion" ) {
	   j++;
	   ctx.fillText("Consumables",width*.11,height*((.90-.075*options.length+0.08)+0.08*(i/2 + j)));	
	   j++;
	}
	if ( i+1 == options.length )
	   j++;

       if ( currentOption == i )
           ctx.fillStyle = "red";
       else 
           ctx.fillStyle = "black";
      
	
        ctx.fillText(options[i],width*.11,height*((.90-.075*options.length+0.08)+0.08*(i/2 + j)));
    }
  }
  else {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(width*.10,height*(.90-.10*options.length),width*.80,height*(.10*options.length));
    ctx.font = "60px Sniglet";
  
    for(i = 0; i < options.length; i++ ){
       if ( currentOption == i )
           ctx.fillStyle = "red";
       else 
           ctx.fillStyle = "black";
      
        ctx.fillText(options[i],width*.11,height*((.90-.10*options.length+0.08)+0.08*i));
    }
  }
}

function iMenuHandler(event) {
   keyCode = event.which || event.keyCode;
    switch(keyCode) {
	    case 13: // enter
        if ( options[currentOption] == "Interact" ) { // interact 
          initTextBox();
        }
        else if ( options[currentOption] == "Shop" ) { // shop 
          // shop stuff here   
        }
        else if  ( options[currentOption] == "Exit" ) { // exit 
          document.onkeydown = null;
          document.onkeydown = levelHandler;
          document.onkeyup = levelHandler2;
          for ( i = 0; i < Enemies.length; i++ ) {
             if ( Enemies[i].death == false )
               Enemies[i].whichAction = "alive";
           }
          Player.whichAction = "stand";
          if ( Player.drawInv == true )
		 Player.drawInv = false;
	  else {
   	    for ( i = 0; i < Villagers.length; i++ )
              Villagers[i].drawText = false;	  
	  }
	} 
	else if ( options[currentOption] == "shortSword" ) {
		Player.weapon = "shortSword";
	}
	else if ( options[currentOption] == "spear" ) {
		if ( Player.inventory[(currentOption-1)*2 +1] == 1 ) 
			Player.weapon = "spear";
	}
	else if ( options[currentOption] == "potion" ) {
		if ( Player.health < Player.totalHealth && Player.inventory[(currentOption-1)*2+1] > 0 ) {
			Player.health = Player.health + Player.totalHealth*.25;
			if ( Player.health > Player.totalHealth )
				Player.health = Player.totalHealth;
			Player.inventory[(currentoption-1)*2+1]--;
		}
	}
        break;
     case 38: // up
        if ( currentOption == 0 )
          currentOption = options.length-1;
        else if ( Player.drawInv == true )
	  currentOption-=2;	
	else
          currentOption--;
        break;
     case 40: // down
        if ( currentOption == options.length-1 )
          currentOption = 0;
        else if ( Player.drawInv == true )
	  currentOption+=2;	
	else
          currentOption++;
        break;
     default:
        break;
    }
}
