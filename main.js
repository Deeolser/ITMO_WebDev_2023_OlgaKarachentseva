const DOM = document.getElementById.bind(document);

const domInpOperand1 = DOM('inpOperand1');
const domInpOperand2 = DOM('inpOperand2');
const domSltOperator = DOM('sltOperator');
const domConResult = DOM('conResult');

const operations = {
  OpAdd: (a, b) => a + b,
  OpSub: (a, b) => a - b,
  OpMult: (a, b) => a * b,
  OpDiv: (a, b) => a / b,
};

const calc = () => {
  const operator = domSltOperator.value;
  const a = parseInt(domInpOperand1.value);
  const b = parseInt(domInpOperand2.value);
  const opFun = operations[operator];
  domConResult.textContent = opFun(a, b);
  console.log(domConResult.textContent);
  if (domConResult.textContent === 'NaN') {
    domConResult.textContent = `ERROR`;
  }
};

domInpOperand1.oninput = calc;
domInpOperand2.oninput = calc;
domSltOperator.oninput = calc;
