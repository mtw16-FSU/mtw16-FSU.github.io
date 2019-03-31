function clearForms(){
    var forms = document.getElementsByTagName("form");
    var signupLink = document.getElementById("signup-link");
    var canvas = document.getElementById("canvas");
                
    for(var i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
        forms[i].style.opacity = "0";
    }
    
    signupLink.style.display = "none";
    signupLink.style.opacity = "0";

    canvas.style.display = "block";
    canvas.style.opacity = "1";
}

function showSignUp(){
    var signup = document.getElementById("signup");
    var login = document.getElementById("login");
    
    var signupLink = document.getElementById("signup-link");

    signup.style.display = "block";
    signup.style.opacity = "1";

    login.style.display = "none";
    login.style.opacity = "0";

    signupLink.style.display = "none";
    signupLink.style.opacity = "0";
}

function showFullScreenMessage(toggle){
    var fullScreenMessage = document.getElementById("fullscreen-message");     
    
    if(toggle){
        var counter = 1;
        fullScreenMessage.innerHTML = "Now in Full Screen mode, press f to escape."; 
        fullScreenMessage.style.border = "2px solid black";
        fullScreenMessage.style.padding = "10px 0";
        
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
        fullScreenMessage.innerHTML = "";
        fullScreenMessage.style.border = "none";
        fullScreenMessage.style.padding = "0";
        fullScreenMessage.style.opacity = 1;   
    }
    
}

function showLogin(){
    var login = document.getElementById("login");
    var signupLink = document.getElementById("signup-link");

    document.getElementById("title").innerHTML = "A Knight's Tale";

    login.style.display = "block";
    login.style.opacity = "1";

    //alert("b: " + signupLink.style.display);
    signupLink.style.display = "block";
    signupLink.style.opacity = "1";
    //alert("a: " + signupLink.style.display);
}