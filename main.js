const DOM = document.getElementById.bind(document);

const domInpName = DOM('impName');
const domInpSurname = DOM('impSurname');
const domConResult = DOM('conResult');

domInpName.oninput = function(event) {
  console.log('onInpNameInput:', { event });
  renderFullName();
};

domInpSurname.oninput = function(event) {
  console.log('onInpSurnameInput:', { event });
  renderFullName();
};

const getFullName = () => `${domInpName.value} ${domInpSurname.value}`;

function renderFullName() {
  const fullName = getFullName();
  console.log('renderFullName:', { fullName });
  domConResult.textContent = fullName;
};

console.log(domInpName, domInpSurname);
