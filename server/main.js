import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./postsHandler.js"
import userRoutes from "./usersHandler.js"
import storyRoutes from "./storiesHandler.js"
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


const CONNECTION_URL = "mongodb+srv://IdrisAdmin:IdrisVohra987@clustertmc.fltfidg.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('listening on port:', "http://localhost:5000/")))
    .catch((err) => console.error(err));