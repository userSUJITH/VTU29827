const axios = require("axios");

console.log("BASE_URL:", process.env.BASE_URL);
console.log(
  "TOKEN:",
  process.env.ACCESS_TOKEN
    ? process.env.ACCESS_TOKEN.substring(0, 30)
    : "NOT FOUND"
);

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

module.exports = apiClient;