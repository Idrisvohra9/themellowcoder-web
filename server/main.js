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


const url = "mongodb+srv://IdrisAdmin:IdrisVohra987@clustertmc.fltfidg.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.set("strictQuery", true);
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database. Server running on http://localhost:5000')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
// mongoose.d
// console.log(mongoose.modelNames());
// console.log(mongoose.ConnectionStates);
// console.log(mongoose.Document);