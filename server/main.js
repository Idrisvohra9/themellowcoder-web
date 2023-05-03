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

// const PORT = process.env.PORT || 5000;
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

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
})