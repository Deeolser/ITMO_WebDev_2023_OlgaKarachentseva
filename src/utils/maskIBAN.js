const maskIBAN = (input) => {
  let textMask = input.value.replace(/[^a-zA-Zа-яА-Я0-9]/g, '');
  if (textMask.length > 30) {
    textMask = textMask.slice(0, 30);
  }
  const upperCaseInput = textMask.toUpperCase();
  const groups = [];
  for (let i = 0; i < upperCaseInput.length; i += 4) {
    groups.push(upperCaseInput.slice(i, i + 4));
  }
  input.value = groups.join(' ').replace(/(^s+|s+$)/g, '');
};

export { maskIBAN };
