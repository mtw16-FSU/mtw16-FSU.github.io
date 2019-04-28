const db = firebase.firestore();

//executes onload to check if the user is already logs in and displays game if they are
function checkLogin(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            clearForms();
            document.getElementById("waiting").innerHTML = "";
            document.getElementById("error-message").innerHTML = "";
            showStartMenu();
            
            db.collection('SaveFile').doc(user.uid).get().then(doc=> {
                //alert("Here: " + doc.data().name);
                saveFiles.push(new SaveFile(doc.data()));
            }).catch(function(error) {
                alert(error.message);
            });
        }
      });
}

//sign up function
function createUser(){
    var errorMessage = document.getElementById("error-message");

    //gets the values entered in the form for the new user
    var username = document.getElementById("usernameNew").value;
    var password = document.getElementById("passwordNew").value;
    var displayName = document.getElementById("displayNameNew").value;

    if(!displayName){
        errorMessage.innerHTML = "Display name cannot be blank.";
    }else{
        //displays loading message while attempting to connect to the Firebase database
        var waiting = document.getElementById("waiting");
        waiting.innerHTML = "Waiting...";

        //Firebase authorization requires a password to login,
        //so automatically adds a fake email account suffix to every username
        username += "@dummy.com";

        firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
            //if an error occured, displays the error message to the user
            errorMessage.innerHTML = error.message;
            var formFields = document.getElementsByTagName("input");
            for(var i = 0; i < formFields.length; i++){
                    formFields[i].className += " form-error";
            }
            
            waiting.innerHTML = "";
        }).then( cred => {
            db.collection('SaveFile').doc(cred.user.uid).set({
                location: "Level 1",
                name: displayName,
                hours: 0,
                minutes: 0,
                seconds: "00"
            });
        });
    }

}

//login function
function logInUser(){
    //removes link to create new user
    var signupLink = document.getElementById("signup-link");
    var signupLinkMessage = signupLink.innerHTML;
    signupLink.innerHTML = "";
    
    //displays loading message
    var waiting = document.getElementById("waiting");
    waiting.innerHTML = "Waiting...";

    var errorMessage = document.getElementById("error-message");

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
            
    //Every username in the database will contain this suffix due to how new users are added in 
    username += "@dummy.com";
    
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error){
        //if an error occured, displays the error message to the user
        errorMessage.innerHTML = error.message;
        var formFields = document.getElementsByTagName("input");
        for(var i = 0; i < formFields.length; i++){
                formFields[i].className += " form-error";
        }
        
        signupLink.innerHTML = signupLinkMessage;
        waiting.innerHTML = "";
    });
}

//logs the user out of the game
function logout(){
    //if logout attempt is successful, stops displaying the game and displays the login menu
    firebase.auth().signOut().then(function() {
        document.getElementById("canvas").style.display = "none";
        showLogin();
        stopGame();
        init();

    }).catch(function(error) {
            document.getElementById("error-message").innerHTML = error.message;
      });
}
