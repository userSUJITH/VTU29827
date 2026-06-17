const apiClient = require("../utils/apiClient");

async function getDepots() {
  try {
    const response = await apiClient.get("/depots");
    return response.data;
  } catch (error) {
    console.log("STATUS =>", error.response?.status);
    console.log("DATA =>", error.response?.data);

    throw new Error(
      error.response?.data?.message || error.message
    );
  }
}

module.exports = {
  getDepots
};