import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./db.js";
import cveFetch from "./services/cveFetch.js"; 

const app = express();
const port = process.env.PORT;

config();
connectToDB();

app.use(express.json());

app.get("/fetch-cve", async (req, res) => {
  try {
    await cveFetch.fetchAndStoreSingleCVE();
    res.send("CVE data fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching or storing CVE data:", error);
    res.status(500).send("Error fetching or storing CVE data.");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// app.get("/", (req, res) => {
//     res.send("Hello world!");
// });










