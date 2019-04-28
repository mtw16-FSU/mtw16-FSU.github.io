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
  if ( Player.drawInv == true || drawShop == true ) {
    ctx.fillStyle = "#FFFFFF";
    ctx.drawImage(interactionMenuImage, width*.10, height*(.90-.075*(Math.ceil(options.length/2)+4)), width*.80, height*(.075*(Math.ceil(options.length/2)+4)));
    //ctx.fillRect(width*.10,height*(.90-.075*(Math.ceil(options.length/2)+4)),width*.50,height*(.075*(Math.ceil(options.length/2)+4)));
    ctx.font = "45px Sniglet";
    var j = 0;
    for(i = 0; i < options.length; i+=2 ){
	ctx.fillStyle = "black";
	if ( i == 0 ) {
  	   ctx.fillText("Weapons:",width*.13,height*((.90-.075*options.length+0.06)+0.06*(i/2 + j)));	    
    	   j++;
    	}
	else if ( options[i] == "potion" ) {
	   j++;
	   ctx.fillText("Consumables:",width*.13,height*((.90-.075*options.length+0.06)+0.06*(i/2 + j)));	
	   j++;
	}
	else if ( i+1 == options.length )
	   j++;

       if ( currentOption == i )
           ctx.fillStyle = "red";
       else 
           ctx.fillStyle = "black";
      
        ctx.fillText(options[i],width*.13,height*((.90-.075*options.length+0.06)+0.06*(i/2 + j)));
	if ( (drawShop == true || Player.drawInv == true) && i+1 != options.length ) {
	  ctx.fillStyle = "black";
	  ctx.fillText(options[i+1],width*.41,height*((.90-.075*options.length+0.06)+0.06*(i/2 + j)));
	}
    }
  }
  else {
    ctx.fillStyle = "#FFFFFF";
    ctx.drawImage(interactionMenuImage, width*.10, height*(.90-.10*options.length), width*.80, height*(.10*options.length));
    //ctx.fillRect(width*.10,height*(.90-.10*options.length),width*.80,height*(.10*options.length));
    ctx.font = "60px Sniglet";
  
    for(i = 0; i < options.length; i++ ){
       if ( currentOption == i )
           ctx.fillStyle = "red";
       else 
           ctx.fillStyle = "black";
      
        ctx.fillText(options[i],width*.13,height*((.90-.10*options.length+0.08)+0.08*i));
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
          options = ["spear",100,"shortSword",100,"potion",100,"Exit"];
          drawShop = true;
	  currentOption = 0;
	}
        else if  ( options[currentOption] == "Exit" ) { // exit 
          if ( drawShop == true ) {
	    drawShop = false;
	    options = ["Interact","Shop","Exit"];
	    currentOption = 0;
	  }
	  else {
  	    for ( i = 0; i < Enemies.length; i++ ) {
               if ( Enemies[i].death == false )
                 Enemies[i].whichAction = "alive";
             }
            Player.whichAction = "stand";
            if ( Player.drawInv == true ) {
	      Player.drawInv = false;
	      mainMenuOn = true;
	      document.onkeydown = null;
	      document.onkeydown = mainMenuHandler;
	      options = ["Resume","Items","Map","Save Game","Exit"];
	      currentOption = 0;
	    }
	    else {
   	      for ( i = 0; i < Villagers.length; i++ )
              Villagers[i].drawText = false;	  
	      document.onkeydown = null;
              document.onkeydown = levelHandler;
              document.onkeyup = levelHandler2;
	    }
	  }
	}
	else if ( options[currentOption] == "shortSword" ) {
		if ( drawShop == false ) {
			Player.weapon = "shortSword";
			alert("ShortSword Equipped");
		}
		else if ( Player.gold-options[currentOption+1] >= 0 ) {
			Player.gold = Player.gold - options[currentOption+1];
			for ( i = 0; i < Player.inventory.length; i+=2 ) {
			  if ( Player.inventory[i] == "shortSword" ){
			    alert("Bought Short Sword");	  
			    Player.inventory[i+1]++;
			  }
			}
		}
	}
	else if ( options[currentOption] == "spear") {
	    if ( drawShop == false ) {
		if ( Player.inventory[(currentOption-1)*2 +1] == 1 ) {
			Player.weapon = "spear";
			alert("Spear Equipped");
		}
	    }
	    else if ( Player.gold-options[currentOption+1] >= 0 ) {
		Player.gold = Player.gold - options[currentOption+1];
		for ( i = 0; i < Player.inventory.length; i+=2 ) {
		  if ( Player.inventory[i] == "spear" ) {
		    Player.inventory[i+1]++;
		    alert("Bought Spear");	  
		  }
		}
    	    }
	}
	else if ( options[currentOption] == "potion" ) {
	    if ( drawShop == false ) {
		if ( Player.health < Player.totalHealth && Player.inventory[currentOption+1] > 0 ) {
			Player.health = Player.health + Player.totalHealth*.25;
			if ( Player.health > Player.totalHealth )
				Player.health = Player.totalHealth;
			Player.inventory[currentoption+1]--;
		}
	    }
	    else if ( Player.gold-options[currentOption+1] >= 0 ) {
		Player.gold = Player.gold - options[currentOption+1];
		for ( i = 0; i < Player.inventory.length; i+=2 ) {
		  if ( Player.inventory[i] == "potion" ) {
		    Player.inventory[i+1]++;
		    alert("Bought potion");	  
		  }
		}
	    }
	}
        break;
     case 38: // up
        if ( currentOption == 0 )
          currentOption = options.length-1;
        else if ( Player.drawInv == true || drawShop == true)
	  currentOption-=2;	
	else
          currentOption--;
        break;
     case 40: // down
        if ( currentOption == options.length-1 )
          currentOption = 0;
        else if ( Player.drawInv == true || drawShop == true )
	  currentOption+=2;	
	else
          currentOption++;
        break;
     default:
        break;
    }
}
