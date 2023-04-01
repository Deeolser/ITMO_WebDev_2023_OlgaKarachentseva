const DOM = document.getElementById.bind(document);

const domInpName = DOM('impName');
const domInpSurname = DOM('impSurname');
const domConResult = DOM('conResult');

let fuiiName = '';

function add(a, b = 5) {
  const result = a + b;
  //console.log('add:', a, b, result);
  //console.log(`add:, ${a} | ${b}, | ${result}`);
  console.log('add:', { a, b, result });
  return result;
}

domInpName.oninput = onInpNameInput;
domInpSurname.oninput = onInpSurnameInput;

function renderFullName() {
  fuiiName = domInpName.value + ' ' + domInpSurname.value;

  domConResult.textContent = fuiiName;
};

function onInpNameInput(event) {
  console.log('onInpNameInput:', { event });
  renderFullName();
};

function onInpSurnameInput(event) {
  console.log('onInpSurnameInput:', { event });
  renderFullName();
};

const addResult = add(10);

console.log('addResult:', { addResult });
console.log(domInpName, domInpSurname);
