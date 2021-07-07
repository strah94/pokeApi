import axios from "axios";

export const setToLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const getFromLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  if (data) return JSON.parse(data);
};

export const getPokemonData = async (url) => {
  const res = await axios.get(`${url}`);
  const data = await res.data;

  if (data) return data;
};
