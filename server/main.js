import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./postsHandler.js"
import userRoutes from "./usersHandler.js"
import storyRoutes from "./storiesHandler.js"
import emailRoutes from "./emailHandler.js"
import planCodeRoutes from "./planCodeHandler.js"
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config()
const app = express();

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));

app.use(cors());
// In-memory admin credentials (Replace with your actual admin credentials or connect to a database)
const adminCredentials = {
    username: "tmcAdmin",
    password: "tmcIdris",
};

// Route to handle admin login
app.post("/admin/auth", (req, res) => {
    const { username, password } = req.body;
    // Check if the admin credentials are correct
    if (
        username === adminCredentials.username &&
        password === adminCredentials.password
    ) {
        // Generate a unique token for the admin session
        const token = crypto.randomBytes(16).toString("hex");
        // Send the admin panel link as a response
        res.json({ token });
    } else {
        // Return error for invalid credentials
        res.status(401).json({ error: "Invalid credentials" });
    }
});
// Now the routes for post will be get at /post url
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/stories", storyRoutes);
app.use("/planCode", planCodeRoutes);
app.use("/sendemail", emailRoutes);

app.get("/", (req, res) => {
    res.send("Hello");
    console.log("Hello!");
})
const url = process.env.MONGOOSE_CONNECTION_STRING;

const PORT = process.env.PORT || 5000;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.set("strictQuery", true);
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database.')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})