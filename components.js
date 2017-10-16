
class CircleTexture {
	constructor(color, radius){
		this.color = color;
		this.radius = radius;
	}

	render(context){
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(
			this.entity.pos.x, 
			this.entity.pos.y, this.radius, 0, 2*Math.PI, true);
		context.fill();
	}
}
class CircleBody {
	constructor(vel, radius){
		this.force = V(0, 0);
		this.vel = vel;
		this.radius = radius;
	}

	update(dt){
		this.vel = this.vel.adds(this.force, dt);
		this.entity.pos = this.entity.pos.adds(this.vel, dt);
	}
}

class KillOffScreen {
	constructor(){
	}

	update(dt){
		var p = this.entity.pos;
		if(p.x > screenWidth)
			this.entity.alive = false;
		if(p.y > screenHeight)
			this.entity.alive = false;
		if(p.x < 0)
			this.entity.alive = false;
		if(p.y < 0)
			this.entity.alive = false;
	}
}
class WrapOffScreen {
	constructor(){
	}

	update(dt){
		if(this.entity.pos.x > screenWidth)
			this.entity.pos.x -= screenWidth;
		if(this.entity.pos.y > screenHeight)
			this.entity.pos.y -= screenHeight;
		if(this.entity.pos.x < 0)
			this.entity.pos.x += screenWidth;
		if(this.entity.pos.y < 0)
			this.entity.pos.y += screenHeight;
	}
}

class KilledBy {
	constructor(tag){
		this.tag = tag;
	}

	update(dt){
		var pos = this.entity.pos;
		var body = this.entity.findComponent(CircleBody);

		this.entity.world.entities.forEach(en => {
			if(en.tag != this.tag){
				return;
			}

			var other = en.findComponent(CircleBody);
			if(!other){
				return;
			}

			var distance = en.pos.sub(pos).len();
			if(distance < body.radius + other.radius){
				this.entity.alive = false;
			}
		});
	}
}
