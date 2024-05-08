import axios from "axios";
import CVE from "../models/cve.model.js";
import { apiURL } from "../config.js";

async function fetchCVE() {
    try {
        const response = await axios.get(`${apiURL}?startIndex=0&resultsPerPage=2`);
        const cveDataArray = response.data.vulnerabilities;
        console.log("Fetched CVE data:", cveDataArray);

        for (const cveData of cveDataArray) {
        const newCVE = new CVE(cveData.cve);
        await newCVE.save();
        console.log("CVE data saved successfully:", newCVE);
        } 
    }
    catch (error) {
        console.error("Error fetching CVE data:", error.message);
    }
}

export default fetchCVE();
