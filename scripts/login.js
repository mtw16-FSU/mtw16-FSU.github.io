const db = firebase.firestore();

function createUser(){
    var waiting = document.getElementById("waiting");
    waiting.innerHTML = "Waiting...";

    var errorMessage = document.getElementById("error-message");

    var username = document.getElementById("usernameNew").value;
    var password = document.getElementById("passwordNew").value;
    username += "@dummy.com";
    
    firebase.auth().createUserWithEmailAndPassword(username, password).then(function(error){
        clearForms();
        waiting.innerHTML = "";
        errorMessage.innerHTML = "";
    }).catch(function(error) {
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
    
    firebase.auth().signInWithEmailAndPassword(username, password).then(cred => {
        clearForms();
        waiting.innerHTML = "";
        errorMessage.innerHTML = "";
    }).catch(function(error){
        errorMessage.innerHTML = error.message;
        var formFields = document.getElementsByTagName("input");
        for(var i = 0; i < formFields.length; i++){
                formFields[i].className += " form-error";
        }
        
        waiting.innerHTML = "";
    });
}