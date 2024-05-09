import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./db.js";
import fetchCVE from "./services/cveFetch.js"; 
import CVE from "./models/cve.model.js";

const app = express();
const port = process.env.PORT;

config();
connectToDB();

app.use(express.json());

// app.get("/fetch-cve", async (req, res) => {
//   try {
//     await cveFetch.fetchCVE();
//     res.send("CVE data fetched and stored successfully.");
//   } catch (error) {
//     console.error("Error fetching or storing CVE data:", error);
//     res.status(500).send("Error fetching or storing CVE data.");
//   }
// });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/cves/list", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalRecords = await CVE.countDocuments();
    const cves = await CVE.find().skip(skip).limit(limit);

    res.render("index", { cves, totalRecords, page, limit });
  } catch (err) {
    console.error("Error fetching CVEs:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/fetch-cve-data", async (req, res) => {
  try {
    const startIndex = 0; 
    await fetchCVE(startIndex);
    res.send("CVE data fetched and stored successfully!");
  } 
  catch (error) {
    console.error("Error fetching or storing CVE data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// app.get("/", (req, res) => {
//     res.send("Hello world!");
// });










