const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Planet {
  x;
  y;
  pX;
  pY;
  atmosphere;
  radius;
  size;

  constructor(x, y, size = 10, atmosphere = 'red', radius = 150) {
    this.pX = x;
    this.pY = y;
    this.size = size;
    this.atmosphere = atmosphere;
    this.radius = radius;
  }

  alfa;

  move() {
    this.x = this.radius * Math.sin(alfa) + this.pX;
    this.y = this.radius * Math.cos(alfa) + this.pY;
    alfa += (SPEED_MULT * Math.PI) / 180;
  }

  render = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = this.atmosphere;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };
}

const SPEED_MULT = 0.2;
let alfa = 0;

const planets = [
  new Planet(200, 200, 30, 'red', 150),
  new Planet(200, 200, 10, 'green', 50),
  new Planet(200, 200, 20, 'yellow', 100),
  new Planet(200, 200, 50, 'blue', 200),
];
let planet;

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const planetIndex in planets) {
    planet = planets[planetIndex];
    planet.move();
    // planet.x = planet.radius * Math.sin(alfa) + planet.pX;
    // planet.y = planet.radius * Math.cos(alfa) + planet.pY;
    // alfa += (SPEED_MULT * Math.PI) / 180;
    planet.render(ctx);
  }

  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
