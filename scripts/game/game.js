function init(){
    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    canvas.width = 2000;
    canvas.height = 1000;

    var width = canvas.width;
    var height = canvas.height;

    var startMessage = "A Knight's Tale";
    ctx.font = "150px Sniglet";
    var testSquareX = width/2 - 50, testSquareY = height/2 + 150;
    var dx = 5;
    
    setInterval(function(){
        ctx.clearRect(0,0,width,height);

        ctx.fillStyle = "black";
        ctx.fillRect(0,0,width,height);
        ctx.fillStyle = "red";
        ctx.fillText(startMessage, width / 2 - 450, height / 2);
    
        ctx.fillStyle = "green";
        ctx.fillRect(testSquareX, testSquareY, 100, 100);
        testSquareX += dx;

        if(testSquareX >= width - 100 || testSquareX <= 0){
            dx *= -1;
        }
    }, 1000/60);
}