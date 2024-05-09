import { Router } from "express";
import CVE from "../models/cve.model.js";


const router = Router();
router.get('/list', async (req, res) => {
    var total = 0;
    const limitVal =  parseInt(req.query.limit);
    const skipVal = (parseInt(req.query.page) - 1) * limitVal;

    total = await CVE.countDocuments();
    const cve = await CVE.find().skip(skipVal).limit(limitVal).sort({"cve.published" :-1, "cve.lastmodified": -1});
  
  
    res.render('index', {
      data : cve, 
      page: req.query.page, 
      limit: req.query.limit, 
      totalRecords: total, 
    });
  });

  router.get('/:cveId', async (req, res) => {
    CVE.findOne({"cve.id": req.params.cveId}).then((cve) =>{
      res.render('cveInfo', {data: cve});
    });
  });

  export default router;