import axios from "axios";

const API = axios.create({
  baseURL: "https://primetradescalablewebapp-production.up.railway.app/api",
});

export default API;
