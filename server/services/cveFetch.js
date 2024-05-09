import axios from "axios";
import CVE from "../models/cve.model.js";
import { apiURL, resultsPerPage } from "../config.js";

async function fetchCVE(startIndex) {
    try {
        const response = await axios.get(`${apiURL}?startIndex=${startIndex}&resultsPerPage=${resultsPerPage}`);
        const {data} = response;
        const cves = data.vulnerabilities;
        await CVE.insertMany(cves);
    
        if (data.totalResults > startIndex + resultsPerPage) {
          await fetchCVE(startIndex + resultsPerPage);
          console.log(`${startIndex} done.`);
        } 
        else {
          console.log("Data fetched successfully!");
        }
      } 
      catch (error) {
        console.error("Error fetching CVE data:", error);
      }
}

export default fetchCVE;
