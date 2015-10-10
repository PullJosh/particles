var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

var imageDataId = ctx.createImageData(1,1),
	imgData  = imageDataId.data;

imgData[0] = 255;
imgData[1] = 255;
imgData[2] = 255;
imgData[3] = 255;

var cursorX = 0;
var cursorY = 0;

document.onmousemove = function(e){
    cursorX = e.pageX - window.innerWidth / 2;
    cursorY = e.pageY - window.innerHeight / 2;
}

function drawDot(x, y) {
    //ctx.putImageData(imageDataId, x + canvas.width / 2, y + canvas.height / 2);
    ctx.fillStyle = "white";
    ctx.fillRect(x + canvas.width / 2, y + canvas.height / 2, 1, 1);
}

function canSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onresize = canSize;
canSize();

var dots = [];

function addDot() {
    var newDot = {};
    newDot.x = 0;
    newDot.y = 0;
    var dir = Math.random() * 2;
    newDot.xVel = Math.cos(Math.PI * dir) * 5;
    newDot.yVel = Math.sin(Math.PI * dir) * 5;
    dots.push(newDot);
}

function updateDots() {
    for(i = 0; i < dots.length; i++) {
        dots[i] = updateDot(dots[i]);
        /*if(Math.abs(dots[i].x) > canvas.width / 2 || Math.abs(dots[i].y) > canvas.height / 2) {
            dots.splice(i, 1);
        }*/
    }
}

function updateDot(dot) {
    var newDot = dot;
    var xDif = newDot.x - cursorX;
    var yDif = newDot.y - cursorY;
    var dist = xDif * xDif + yDif * yDif;
    
    newDot.x += newDot.xVel;
    newDot.y += newDot.yVel;
    if(dist > 40000) {
    	newDot.xVel += xDif / -1000;
    	newDot.yVel += yDif / -1000;
    } else {
        newDot.xVel += xDif / (dist / 100 + 0.01);
    	newDot.yVel += yDif / (dist/ 100 + 0.01);
    }
    newDot.xVel *= 0.95;
    newDot.yVel *= 0.95;
    
    if(Math.abs(newDot.x) > window.innerWidth / 2) {
        newDot.x *= -1;
    }
    if(Math.abs(newDot.y) > window.innerHeight / 2) {
        newDot.y *= -1;
    }
    
    /////////////////////////////////////////
    
    return newDot;
}

function renderDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < dots.length; i++) {
        drawDot(dots[i].x, dots[i].y);
    }
}

function loop() {
    updateDots();
    updateDots();
    updateDots();
    renderDots();
    window.requestAnimationFrame(loop);
}

for(n = 0; n < 3000; n++) {
    addDot();
}

loop();
