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