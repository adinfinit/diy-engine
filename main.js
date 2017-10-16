var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.fillStyle = "#f00";
context.lineWidth = 5;
context.arrow(50, 50, 100, 100);
context.closePath();
context.fill();