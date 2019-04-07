const db = firebase.firestore();

function checkLogin(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            clearForms();
            document.getElementById("waiting").innerHTML = "";
            document.getElementById("error-message").innerHTML = "";
            showStartMenu();
        }
      });
}

function createUser(){
    var waiting = document.getElementById("waiting");
    waiting.innerHTML = "Waiting...";

    var errorMessage = document.getElementById("error-message");

    var username = document.getElementById("usernameNew").value;
    var password = document.getElementById("passwordNew").value;
    username += "@dummy.com";
    
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
        errorMessage.innerHTML = error.message;
        var formFields = document.getElementsByTagName("input");
        for(var i = 0; i < formFields.length; i++){
                formFields[i].className += " form-error";
        }
        
        waiting.innerHTML = "";
    });

}

function signInUser(){
    document.getElementById("signup-link").innerHTML = "";

    var waiting = document.getElementById("waiting");
    waiting.innerHTML = "Waiting...";

    var errorMessage = document.getElementById("error-message");

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
            
    username += "@dummy.com";
    
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error){
        errorMessage.innerHTML = error.message;
        var formFields = document.getElementsByTagName("input");
        for(var i = 0; i < formFields.length; i++){
                formFields[i].className += " form-error";
        }
        
        waiting.innerHTML = "";
    });
}

function logout(){
    firebase.auth().signOut().then(function() {
        document.getElementById("canvas").style.display = "none";
        showLogin();
        stopGame();
        init();

    }).catch(function(error) {
            document.getElementById("error-message").innerHTML = error.message;
      });
}