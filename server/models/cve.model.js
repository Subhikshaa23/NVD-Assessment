import mongoose from "mongoose";

const CVESchema = mongoose.Schema({
  cve : 
  {
    id: {
    type: String,
    required: true,
    unique : true
 },
 sourceIdentifier: {type: String},
 published: {type: Date},
 lastModified: {type: Date},
 vulnStatus: {type: String},
 descriptions: [{
   lang: {type: String},
   value: {type: String}
 }],
 metrics: {
   cvssMetricV2: [{
     source: {type: String},
     type: {type: String},
     cvssData: {
        version: {type: String},
        vectorString: {type: String},
        accessVector: {type: String},
        accessComplexity: {type: String},
        authentication: {type: String},
        confidentialityImpact: {type: String},
        integrityImpact: {type: String},
        availabilityImpact: {type: String},
        baseScore: {type: Number}
     },
     baseSeverity: {type: String},
     exploitabilityScore: {type: Number},
     impactScore: {type: Number},
     acInsufInfo: {type: Boolean},
     obtainAllPrivilege: {type: Boolean},
     obtainUserPrivilege: {type: Boolean},
     obtainOtherPrivilege: {type: Boolean},
     userInteractionRequired: {type: Boolean}
   }],
   cvssMetricV30 : [
    {
      source : {type : String},
      type : {type : String},
      cvssData: {
        version : {type : String},
        vectorString: {type : String},
        accessVector: {type : String},
        accessComplexity : {type : String},
        privilegesRequired : {type : String},
        userInteraction : {type : String},
        scope: {type : String},
        confidentialityImpact : {type : String},
        integrityImpact : {type : String},
        availabilityImpact : {type : String},
        baseScore : {type : Number},
        baseSeverity : {type : String}
        },
      exploitabilityScore : {type : Number},
      impactScore: {type : Number},
    }
  ],
  cvssMetricV30 : [
    {
      source : {type : String},
      type : {type : String},
      cvssData: {
        version : {type : String},
        vectorString: {type : String},
        accessVector: {type : String},
        accessComplexity : {type : String},
        privilegesRequired : {type : String},
        userInteraction : {type : String},
        scope: {type : String},
        confidentialityImpact : {type : String},
        integrityImpact : {type : String},
        availabilityImpact : {type : String},
        baseScore : {type : Number},
        baseSeverity : {type : String}
        },
      exploitabilityScore : {type : Number},
      impactScore: {type : Number},
    }
  ],
 },
 weaknesses: [{
   source: {type: String},
   type: {type: String},
   description: [{
     lang: {type: String},
     value: {type: String}
   }]
 }],
 configurations: [{
   nodes: [{
     operator: {type: String},
     negate: {type: Boolean},
     cpeMatch: [{
       vulnerable: {type: Boolean},
       criteria: {type: String},
       matchCriteriaId: {type: String}
     }]
   }]
 }],
 references: [{
   url: {type: String},
   source: {type: String}
 }]
}
  
});

CVESchema.pre("save", async function (next) 
{
  const duplicateCVE = await this.model("CVE").findOne({ id: this.id });
  if (duplicateCVE) {
    console.log("Duplicate CVE entry found:", duplicateCVE);
  }
  next();
});

const CVE = mongoose.model("CVE", CVESchema);
export default CVE;
