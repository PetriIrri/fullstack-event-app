import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const fetchAll = async () => {
  let result = await axios.get(url);
  return result;
};

export const fetchById = async (id) => {
  let result = await axios.get(url + id);
  return result;
};
