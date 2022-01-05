import axios from "axios";

const url = "http://localhost:8080/events/";

export const fetchAll = async () => {
  let result = await axios.get(url);
  return result;
};

export const fetchById = async (id) => {
  let result = await axios.get(url + id);
  return result;
};
