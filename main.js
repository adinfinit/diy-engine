var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var screenWidth = 0;
var screenHeight = 0;
window.onresize = function(e) {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	canvas.width = screenWidth;
	canvas.height = screenHeight;
};
window.onresize();

context.fillStyle = "#f00";
context.lineWidth = 5;
context.arrow(50, 50, 100, 100);
context.closePath();
context.fill();