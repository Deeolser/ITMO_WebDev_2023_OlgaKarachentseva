const appendBlock = (block) => document.getElementById('app').appendChild(block);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);
const hue = randomRange(0, 359);
const saturation = randomRange(0, 100);
const lightness = randomRange(0, 100);
const HSL = `hsl(${hue} ${saturation}% ${lightness}%)`;

const showColorOrEmpty = () => (Math.random() > 0.5 ? HSL : null);
const createBlock = (x, y, size, color) => {
  const result = document.createElement('div');
  if (color) {
    result.style.backgroundColor = color;
  }
  result.style.width = result.style.height = `${size}px`;
  result.style.position = 'absolute';
  result.style.left = `${x}px`;
  result.style.top = `${y}px`;
  return result;
};

const BLOCK_SIZE = 50;
const DIMENSION = 5;

let columns = DIMENSION;
let rows = columns * 2;
let xPos = 0;
let yPos = 0;

while (rows-- > 0) {
  let line = [];
  xPos = 0;
  columns = DIMENSION;
  while (columns-- > 0) {
    const color = showColorOrEmpty();
    const block = createBlock(xPos, yPos, BLOCK_SIZE, color);
    line.push(color);
    xPos += BLOCK_SIZE;
    appendBlock(block);
  }
  line.reverse().forEach((color) => {
    const block = createBlock(xPos, yPos, BLOCK_SIZE, color);
    appendBlock(block);
    xPos += BLOCK_SIZE;
  });
  yPos += BLOCK_SIZE;
}
;

