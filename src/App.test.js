const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(
    bodyParser.json({
        limit: "30mb",
        extended: true,
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "30mb",
        extended: true,
    })
);
app.use(cors());
// CORS Conifg:
app.use((req, res, next) => {
    // Set the 'Access-Control-Allow-Origin' header to allow all origins
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Set other CORS headers if needed
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Continue to the next middleware or route handler
    next();
});
// In-memory admin credentials (Replace with your actual admin credentials or connect to a database)
const adminCredentials = { username: "IdrisAdmin", password: "Idrisdgr8", };
// Route to handle admin login
app.post("/admin/auth", (req, res) => {
    const { username, password } = req.body;
    // Check if the admin credentials are correct
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Generate a unique token for the admin session
        const token = crypto.randomBytes(16).toString("hex");
        // Send the admin panel link as a response
        res.json({ token });
    } else {
        // Return error for invalid credentials
        res.status(401).json({
            error: "Invalid credentials",
        });
    }
});
app.get("/", (req, res) => {
    res.send("Hello");
    console.log("Hello!");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http: //localhost:port/`);
});