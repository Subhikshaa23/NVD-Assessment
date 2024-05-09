import express from 'express';
import CVE from '../models/cve.model.js';


const router = express.Router();

// Route to get CVE details by CVE ID
router.get('/cves/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cve = await CVE.find({ "cve.id" : id });
        console.log(cve);
        if (!cve) {
            return res.status(404).json({ error: 'CVE not found' });
        }
        // res.json(cve);
        res.render('searchTemplate', {data: cve});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        

    }
});

// Route to get CVE details by year
router.get('/cves/year/:year', async (req, res) => {
    const { year } = req.params;
    try {
        // console.log("Hello");
        const cves = await CVE.aggregate([ { $project : { "cve.id" : 1, year : { "$year" : "$cve.published" } } } , { $match : { "year": 1988} }])
        console.log(cves);
        // res.json(cves);
        res.render('searchTemplate', {data: cves});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get CVE details by score
router.get('/cves/score/:score', async (req, res) => {
    const { score } = req.params;
    try {
        const cves = await CVE.find({
            $or: [
                { 'cve.metrics.cvssMetricV2.cvssData.baseScore': score },
                { 'cve.metrics.cvssMetricV3.cvssData.baseScore': score }
            ]
        });
        console.log(cves);
        // res.json(cves);
        res.render('searchTemplate', {data: cves});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get CVE details by last modified date in N days
router.get('/cves/last-modified/:days', async (req, res) => {
    const { days } = req.params;
    try {
        const cves = await CVE.aggregate([ { $project : {   "cve.id" : 1, datediff : { $dateDiff : { startDate : "$cve.lastModified", endDate : new Date(), unit : 'day' } } } } , { $match : { datediff:12}}])
        // res.json(cves);
        console.log(cves);
        res.render('searchTemplate', {data: cves});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;