require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { getDepots } = require("./services/depot.service");
const { getVehicles } = require("./services/vechicle.services");
const { Log } = require("./utils/logger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Vehicle Scheduler API Running"
    });
});

// Test Depots API
app.get("/test-depots", async (req, res) => {
    try {
        const depots = await getDepots();

        res.json({
            success: true,
            data: depots
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Test Vehicles API
app.get("/test-vehicles", async (req, res) => {
    try {
        const vehicles = await getVehicles();

        res.json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Test Logger API
app.get("/test-log", async (req, res) => {
    try {
        const result = await Log(
            "backend",
            "info",
            "service",
            "Testing logger middleware"
        );

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.log(
            "LOG ERROR =>",
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("================================");
    console.log("BASE_URL:", process.env.BASE_URL);
    console.log(
        "TOKEN:",
        process.env.ACCESS_TOKEN
            ? process.env.ACCESS_TOKEN.substring(0, 25)
            : "NOT FOUND"
    );
    console.log(`Server running on port ${PORT}`);
    console.log("================================");
});