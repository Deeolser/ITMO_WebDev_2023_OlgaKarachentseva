const maskForNum = (input, max) => {
  let textMask = input.value.replace(/[^0-9]/g, '');
  if (textMask.length > max) {
    textMask = textMask.slice(0, max);
  }
  input.value = textMask;
};
export { maskForNum };
