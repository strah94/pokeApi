export const setToLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const getFromLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  if (data) return JSON.parse(data);
};
