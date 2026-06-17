const axios = require("axios");

async function getVehicles() {
    const response = await axios.get(
        `${process.env.BASE_URL}/vehicles`,
        {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }
    );

    return response.data;
}

module.exports = {
    getVehicles
};