const parseLocalStorage = (key, alt) => JSON.parse(localStorage.getItem(key) || JSON.stringify(alt));
const saveToLocalStorage = (key, v) => {
  console.log('> saveToLocalStorage =', v);
  localStorage.setItem(key, JSON.stringify(v));
};
export {
  parseLocalStorage,
  saveToLocalStorage
};