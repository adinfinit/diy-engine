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

const PLAYER = 1;
const ENEMY  = 2;
const BULLET = 4;


class PlayerController {
	constructor(input){
		this.speed = 100;
		this.input = input;
		this.dir = V(0, 0);
	}

	update(dt){
		var dir = V(0, 0);
		if(this.input.pressed(UP))
			dir.y -= 1;
		if(this.input.pressed(DOWN))
			dir.y += 1;
		if(this.input.pressed(LEFT))
			dir.x -= 1;
		if(this.input.pressed(RIGHT))
			dir.x += 1;
		if(dir.len() > 0.1){
			this.dir = dir;
		}

		var body = this.entity.findComponent(CircleBody);
		body.vel = body.vel.adds(dir, this.speed * dt);
		body.vel = body.vel.mul(Math.pow(0.999, dt));

		if(this.input.pressed(SPACE)){
			this.entity.world.spawn(createBullet(this.entity.pos, this.dir));
		}
	}
}

class PlayerTexture {
	constructor(color, radius){
		this.color = color;
		this.radius = radius;
	}

	render(context){
		context.fillStyle = this.color;
		context.lineWidth = this.radius;
		var player = this.entity.findComponent(PlayerController);
		context.arrow(
			this.entity.pos.x, this.entity.pos.y, 
			this.entity.pos.x + player.dir.x * this.radius,
			this.entity.pos.y + player.dir.y * this.radius);
		context.fill();
	}
}

var world = new World();

world.spawn(createPlayer(keyboard));
world.spawn(createEnemy());
world.spawn(createEnemy());
world.spawn(createEnemy());
world.spawn(createEnemy());
world.spawn(createEnemy());

function createBullet(pos, dir){
	var bullet = new Entity([
		new CircleTexture("#f00", 5),
		new CircleBody(dir.mul(100), 5),
		new KillOffScreen()
	]);

	bullet.tag = BULLET;
	bullet.pos = pos;

	return bullet;
}

function createEnemy(){
	var radius = 10;
	var vel = V(
		rr(-50, 50),
		rr(-50, 50));
	var enemy = new Entity([
		new CircleTexture("#000", radius),
		new CircleBody(vel, radius),
		new WrapOffScreen(),
		new KilledBy(BULLET)
	]);

	enemy.tag = ENEMY;
	enemy.pos = V(
			rr(0, screenWidth),
			rr(0, screenHeight));

	return enemy;
}

function createPlayer(input){
	var radius = 10;
	var pos = V(screenWidth/2, screenHeight/2);
	var enemy = new Entity([
		new CircleTexture("#00f", radius),
		new PlayerTexture("#0f0", radius),
		new CircleBody(V(0,0), radius),
		new PlayerController(input),
		new WrapOffScreen(),
		new KilledBy(ENEMY)
	]);

	enemy.tag = PLAYER;
	enemy.pos = pos;

	return enemy;
}

function loop(dt){
	world.update(dt);
	world.render(context);
}

var lastTime = (new Date()) * 1.0;
function animationLoop(){
	var current = (new Date()) * 1.0;
	loop((current - lastTime) * 0.001);
	lastTime = current;
	requestAnimationFrame(animationLoop);
};
animationLoop();