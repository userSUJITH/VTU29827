const axios = require("axios");

async function Log(stack, level, packageName, message) {
    try {
        console.log({
            stack,
            level,
            package: packageName,
            message
        });

        const response = await axios.post(
            `${process.env.BASE_URL}/logs`,
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.log(
            "LOG ERROR =>",
            error.response?.data || error.message
        );

        throw error;
    }
}

module.exports = { Log };