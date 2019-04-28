var startTime = 0;

//Save File information
function SaveFile(data){
	this.name = data.name,
	this.location = data.location,
	this.hours = data.hours,
	this.minutes = data.minutes,
	this.seconds = data.seconds,
	this.gold = data.gold,
	this.shortSwords = data.shortSwords,
	this.spears = data.spears
}

var saveFiles = new Array();

function saveGame(){
	var oldHours, oldMinutes, oldSeconds;
	var endTime = new Date();
	var timeElapsed = (endTime.getTime() - startTime.getTime())/1000;
	
	startTime = endTime;	
	
	var timeHours = Math.floor(timeElapsed / 3600);
	var timeMinutes = Math.floor(timeElapsed / 60);
	var timeSeconds = Math.floor(timeElapsed % 60);
	
	var user = firebase.auth().currentUser;
	
	db.collection('SaveFile').doc(user.uid).get().then(doc=> {
		oldHours = Number(doc.data().hours);
		oldMinutes = Number(doc.data().minutes);
		oldSeconds = Number(doc.data().seconds);		
		timeHours = oldHours + timeHours;
		timeMinutes = oldMinutes + timeMinutes;	
		timeSeconds = oldSeconds + timeSeconds;

		if(timeSeconds > 59){
			timeSeconds = timeSeconds % 60;
			timeMinutes++;
		}

		if(timeMinutes > 59){
			timeMinutes = timeMinutes % 60;
			timeHours++;
		}


		db.collection('SaveFile').doc(user.uid).update({
			hours: timeHours,
			minutes: timeMinutes,
			seconds: timeSeconds,
			location: sceneHandler.scene.name,
			gold: Player.gold,
			shortSwords: Player.inventory[1],
			spears: Player.inventory[3]
		}).then(doc => {

			saveFiles[0].hours = timeHours;
			saveFiles[0].minutes = timeMinutes;
			saveFiles[0].seconds = timeSeconds;
			saveFiles[0].location = sceneHandler.scene.name;
            
		}).catch(function(error) {
			alert("Unknown error, unable to save.");
		});
            }).catch(function(error) {
                alert("Unknown error, unable to get save data.");
            });
	
}
