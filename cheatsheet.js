function reflect(a, n) {
	d = dot(a, n)
	x = x - 2 * d * n.x
	y = y - 2 * d * n.y
}

// or better yet see http://www.randygaul.net/2013/03/27/game-physics-engine-part-1-impulse-resolution/

function circle_circle(a, b) {
	if (a.static && b.static) {
		return;
	}

	delta = a.center - b.center
	if delta > minimum_distance {
		return
	}

	// if a.vel dot b.vel > 0 ==> return

	penetration = delta.normal().scale(a.r + b.r - delta.length);

	var ra = a.mass / (a.mass + b.mass);
	var rb = b.mass / (a.mass + b.mass);

	if (a.static) {
		ra = 1.0
		rb = 0.0
	}
	if (b.static) {
		ra = 0.0;
		rb = 1.0;
	}

	a.center = a.center.add(penetration.scale(rb));
	b.center = b.center.add(penetration.scale(ra));

	var normal = delta.normal();
	double p = 2.0 * (a.velocity.dot(normal) - b.velocity.dot(normal)) / (a.mass + b.mass);

	Vector av = a.velocity.sub(normal.scale(p * a.mass));
	Vector bv = b.velocity.add(normal.scale(p * b.mass));

	a.velocity.set(av);
	b.velocity.set(bv);
}

function circle_aabb(Body circle, Body rect) {
	// circle is circle, rect is rect
	if (circle.static || !rect.static) {
		// TODO: implement properly
		return true;
	}

	Vector closest = new Vector(
		clamp(circle.x, rect.left, rect.right),
		clamp(circle.y, rect.top, rect.bottom));

	Vector delta = circle.center.sub(closest);
	if (delta.length >= circle.radius) {
		return false;
	}

	Vector penetration = delta.normal.scale(circle.radius - delta.length);
	circle.center = circle.center.add(penetration);
	circle.velocity.reflect(delta.normal);

	return true;
}