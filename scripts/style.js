//removes the login and signup forms
function clearForms(){
    var forms = document.getElementsByTagName("form");
    var signupLink = document.getElementById("signup-link");
    var canvas = document.getElementById("canvas");
                
    //removes the display for each form field
    for(var i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
        forms[i].style.opacity = "0";
    }
    
    signupLink.style.display = "none";
    signupLink.style.opacity = "0";

    canvas.style.display = "block";
    canvas.style.opacity = "1";
}

//removes the login form and shows the signup form
function showSignUp(){
    var signup = document.getElementById("signup");
    var login = document.getElementById("login");

    //clears error messages if there is a failed login attempt prior to sign-up
    var formFields = document.getElementsByTagName("input");
    for(var i = 0; i < formFields.length; i++){
        formFields[i].className = "";
    }
    
    document.getElementById("error-message").innerHTML = "";
    
    var signupLink = document.getElementById("signup-link");

    signup.style.display = "block";
    signup.style.opacity = "1";

    login.style.display = "none";
    login.style.opacity = "0";

    signupLink.style.display = "none";
    signupLink.style.opacity = "0";
}

//displays a message for a short period of time after fullscreen mode is turned on
function showFullScreenMessage(toggle){
    var fullScreenMessage = document.getElementById("fullscreen-message");     
    
    //dislpays message only if fullscreenmode is being turned on
    if(toggle){
        var counter = 1;
        fullScreenMessage.innerHTML = "Now in Full Screen mode, press f to escape."; 
        fullScreenMessage.style.border = "2px solid black";
        fullScreenMessage.style.padding = "10px 0";
        
        //waits 1.25 seconds after fullscreen mode is activated before slowly removing
        //the message from the screen over the course of a few seconds
        setTimeout(function(){
            var showButton = setInterval(function(){
            fullScreenMessage.style.opacity = counter;

            if(counter <= 0){
                fullScreenMessage.innerHTML = "";
                fullScreenMessage.style.border = "none";
                fullScreenMessage.style.padding = "0";
                fullScreenMessage.style.opacity = 1;
                clearInterval(showButton);
            }

            counter -= 0.02;
        }, 1000/60);
        }, 1250);
        
    }else{
        //if already in fullscreen mode, ensures the message box is completely hidden
        fullScreenMessage.innerHTML = "";
        fullScreenMessage.style.border = "none";
        fullScreenMessage.style.padding = "0";
        fullScreenMessage.style.opacity = 1;   
    }
    
}

//displays login menu
function showLogin(){
    var login = document.getElementById("login");
    var signupLink = document.getElementById("signup-link");

    document.getElementById("title").innerHTML = "A Knight's Tale";

    login.style.display = "block";
    login.style.opacity = "1";

    signupLink.style.display = "block";
    signupLink.style.opacity = "1";
}
