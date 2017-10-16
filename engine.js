
class World {
	constructor(){
		this.entities = [];
	}

	spawn(entity) {
		entity.world = this;
		this.entities.push(entity);
	}

	update(dt){
		this.entities.forEach(en => {
			en.update(dt);
		});
		this.entities = this.entities.filter(en => {
			return en.alive;
		});
	}

	render(context){
		context.fillStyle = "#fff";
		context.fillRect(0, 0, screenWidth, screenHeight);	
		this.entities.forEach(en => {
			en.render(context);	
		});
	}
}

class Entity {
	constructor(components){
		this.tag = 0;
		this.world = null;
		this.alive = true;
		this.pos = V(0, 0);
		this.components = [];
		components.forEach(c => {
			this.add(c);
		});
	}

	add(component){
		component.entity = this;
		this.components.push(component);
	}

	findComponent(componentClass){
		for(var i = 0; i < this.components.length; i++){
			if(this.components[i] instanceof componentClass){
				return this.components[i];
			}
		}
		return null;
	}

	update(dt){
		this.components.forEach(c => {
			if(c.update){
				c.update(dt);
			}
		})
	}

	render(context){
		this.components.forEach(c => {
			if(c.render){
				c.render(context);
			}
		})
	}
}
