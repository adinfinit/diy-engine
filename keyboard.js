const UP = 38;
const LEFT = 37;
const RIGHT = 39
const DOWN = 40;
const SPACE = 32;

var keyboard = {
	pressed: function(key){
		return this[key];
	}
};
document.onkeydown = function(ev){ keyboard[ev.keyCode] = true; };
document.onkeyup = function(ev){ keyboard[ev.keyCode] = false; };
