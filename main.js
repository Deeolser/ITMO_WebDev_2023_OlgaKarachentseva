import { Earth, Planet } from './src/solar-system';
import { Position } from './src/position.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerPosition = new Position(canvas.width / 2, canvas.height / 2);
const sun = new Planet(centerPosition, 0, 10, 'red', 150);
const earth = new Earth(sun.position);

const planets = [
  sun,
  earth,
  new Planet(centerPosition, 0.3, 20, 'green', 150),
  new Planet(centerPosition, 0.4, 50, 'gold', 200),
];

let planet;

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const planetIndex in planets) {
    planet = planets[planetIndex];
    planet.move();
    planet.render(ctx);
  }

  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
