import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./db.js";
import fetchCVE from "./services/cveFetch.js"; 
import CVE from "./models/cve.model.js";
import cvesRoute from "./routes/cvesRoute.js"
import apiRoutes from './routes/apiRoutes.js'; 

const app = express();
const port = process.env.PORT;

config();
connectToDB();

app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use('/cves', cvesRoute);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.redirect('/cves/list?page=1&limit=10')
});

app.get("/fetch-cve-data", async (req, res) => {
  try {
    const startIndex = 188000; 
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










