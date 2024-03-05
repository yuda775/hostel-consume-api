import axios from "axios";

export const login = async (email, password) => {
  return await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });
};

export const register = async (email, password, fullName) => {
  return await axios.post("http://localhost:3000/auth/register", {
    email,
    password,
    fullName,
  });
};
