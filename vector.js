class Vector {
	constructor(x, y){
		this.x = +x;
		this.y = +y;
	}

	add(b){ return new Vector(this.x + b.x, this.y + b.y); }
	adds(b, s){ return new Vector(this.x + b.x*s, this.y + b.y*s); }
	sub(b){ return new Vector(this.x - b.x, this.y - b.y); }
	mul(s){ return new Vector(this.x * s, this.y * s); }
	len() { return Math.sqrt(this.x*this.x + this.y*this.y); }
}

function V(x, y){ return new Vector(x, y); }

function rr(min, max){
	return Math.random() * (max - min) + min;
}
