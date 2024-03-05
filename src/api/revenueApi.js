import axios from "axios";

export const getRevenue = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.get("http://localhost:3000/revenue", { headers });
};
