const axios = require("axios");
require("dotenv").config();

async function getNotifications() {
    try {
        const response = await axios.get(
            `${process.env.BASE_URL}/notifications`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "Notification API Error:",
            error.response?.data || error.message
        );

        throw error;
    }
}

module.exports = {
    getNotifications
};