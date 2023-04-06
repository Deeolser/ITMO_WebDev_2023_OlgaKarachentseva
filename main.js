const DOM = (id) => document.getElementById(id);
const appendBlockToContainer = (block, container) => container.appendChild(block);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);
const getColorOrEmptyOnRandom = () => {
  const isNotEmpty = Math.random() > 0.5;
  if (isNotEmpty) {
    return 'black';
  }
  return 'red';
};
const createBlockWithParamsAtPosition = (x, y, size, color) => {
  const result = document.createElement('div');
  if (color) {
    result.style.backgroundColor = color;
  }
  //console.log(x, y);
  result.style.width = result.style.height = `${size}px`;
  result.style.color = 'white';
  result.style.position = 'absolute';
  result.style.left = `${x}px`;
  result.style.top = `${y}px`;

  return result;
};
const BLOCK_SIZE = 50;
const STEP_DELTA_X = BLOCK_SIZE;
const DIMENSION = 8;
const DIMENSION_HALF = DIMENSION / 2;
const container = DOM('app');
let columns = 0;
let rows = 0;
let xPos = 0;
let yPos = 0;
// while (rows-- > 0) {
let colorsInLine = [];
const saveColorsFoFutureUse = (color) => {
  colorsInLine.push(color);
};

while (columns++ < DIMENSION_HALF) {
  const color = getColorOrEmptyOnRandom();
  const block = createBlockWithParamsAtPosition(xPos, yPos, BLOCK_SIZE, color);
  block.innerText = columns;
  saveColorsFoFutureUse(color);
  appendBlockToContainer(block, container);
  // Смещаем наш элемент на величину размера блока
  xPos += STEP_DELTA_X;
  //columns += 1;
}


// const rightHalfOffsetX = (DIMENSION / 2) * BLOCK_SIZE;
// colorsInLine.reverse().forEach((color, index) => {
//   const block = createBlock(BLOCK_SIZE * index + rightHalfOffsetX, yPos, BLOCK_SIZE, color);
//   appendBlockToContainer(block);
// });
//   yPos += BLOCK_SIZE;
// }
// const appendBlockToContainer = (block, container) => document.getElementById('app').appendChild(block);
//
//
//
// const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);
// const hue = randomRange(0, 359);
// const saturation = randomRange(0, 100);
// const lightness = randomRange(0, 100);
// const HSL = `hsl(${hue} ${saturation}% ${lightness}%)`;


// // const getColorOrEmptyOnRandom = () => Math.random() > 0.5 ? HSL : 'red';
// const createBlockWihtSizeAndColorAtPosition = (x, y, size, color) => {
//   const result = document.createElement('div');
//   if (color) {
//     result.style.backgroundColor = color;
//   }
//   result.style.width = result.style.height = `${size}px`;
//   result.style.position = 'absolute';
//   result.style.left = `${x}px`;
//   result.style.top = `${y}px`;
//   return result;
// };
//
// const BLOCK_SIZE = 50;
// const STEP_DELTA_X = BLOCK_SIZE;
// const DIMENSION = 8;
// const DIMENSION_HALF = DIMENSION;
// const container = document.getElementById('app');
//
// let columns = DIMENSION / 2;
// let rows = DIMENSION;
// let xPos = 0;
// let yPos = 0;
//
// //while (rows-- > 0) {
// let ColorsInLine = [];
// // xPos = 0;
// columns = 0;
// while (columns < DIMENSION_HALF) {
//   const color = getColorOrEmptyOnRandom();
//   const block = createBlockWihtSizeAndColorAtPosition(xPos, yPos, BLOCK_SIZE, color);
//   ColorsInLine.push(color);
//   appendBlockToContainer(block);
//   xPos += STEP_DELTA_X;
//   columns += 1;
// }
//
// const rightHailOffsetX = (DIMENSION / 2) * BLOCK_SIZE;
// ColorsInLine.reverse().forEach((color, index) => {
//   const block = createBlockWihtSizeAndColorAtPosition(BLOCK_SIZE * (index + rightHailOffsetX), yPos, BLOCK_SIZE, color);
//   appendBlockToContainer(block);
//   // xPos += BLOCK_SIZE;
// });
//
// //yPos += BLOCK_SIZE;
// //}
// ;

