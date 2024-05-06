import express from "express";
import {config} from "dotenv";

const app = express();
const port = process.env.PORT;
config();


app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log("Server listening");
});