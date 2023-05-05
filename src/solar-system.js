import { Position } from './position.js';

class Planet {
  x;
  y;
  size;
  center;
  atmosphere;
  radius;
  alfa;
  speed;
  isMoving;

  constructor(
    center,
    speed = 0.1,
    size = 10,
    atmosphere = 'red',
    radius = 150,
  ) {
    this.center = center;
    this.speed = speed;
    this.size = size;
    this.atmosphere = atmosphere;
    this.radius = radius;
    this.alfa = 0;
    this.isMoving = speed !== 0;
    this.position = new Position(center.x, center.y);
  }

  move() {
    if (this.isMoving) {
      this.position.x = this.radius * Math.sin(this.alfa) + this.center.x;
      this.position.y = this.radius * Math.cos(this.alfa) + this.center.y;
      this.alfa += (this.speed * Math.PI) / 180;
    }
  }

  render = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = this.atmosphere;
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };
}

class Earth extends Planet {
  constructor(center) {
    super(center, 2.2, 30, 'blue', 50);
    this.moon = new Planet(this.position, 2.3, 0, 'gray', 50);
  }

  move() {
    super.move();
    this.moon.move();
  }

  render(ctx) {
    super.render(ctx);
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(this.position.x + 10, this.position.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    this.moon.render(ctx);
  }
}

export { Planet, Earth };
