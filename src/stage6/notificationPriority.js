require("dotenv").config();

const axios = require("axios");

const weights = {
    Placement: 100,
    Result: 50,
    Event: 20
};

async function main() {
    try {
        console.log("Fetching notifications...\n");

        const response = await axios.get(
            `${process.env.BASE_URL}/notifications`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        const notifications =
            response.data.notifications || [];

        console.log(
            `Total Notifications: ${notifications.length}\n`
        );

        const ranked = notifications.map((n) => {

            const weight =
                weights[n.Type] || 0;

            const ageMinutes =
                (Date.now() -
                    new Date(n.Timestamp).getTime()) /
                (1000 * 60);

            const recencyScore =
                Math.max(0, 100 - ageMinutes);

            return {
                ...n,
                priority:
                    weight + recencyScore
            };
        });

        ranked.sort(
            (a, b) =>
                b.priority - a.priority
        );

        console.log("\n===== TOP 10 =====\n");

        console.table(
            ranked.slice(0, 10).map((n) => ({
                ID: n.ID,
                Type: n.Type,
                Message: n.Message,
                Timestamp: n.Timestamp,
                Priority: n.priority.toFixed(2)
            }))
        );

    } catch (error) {
        console.error(
            error.response?.data || error.message
        );
    }
}

main();