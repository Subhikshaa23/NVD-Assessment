import mongoose from "mongoose";

const CVESchema = mongoose.Schema({
  id: String,
  sourceIdentifier: String,
  published: Date,
  lastModified: Date,
  vulnStatus: String,
  descriptions: [
    {
      lang: String,
      value: String,
    },
  ],
  metrics: {
    cvssMetricV2: [
      {
        source : {type : String},
				type : {type : String},
        cvssData: {
          version: String,
          vectorString: String,
          accessVector: String,
          accessComplexity: String,
          authentication: String,
          confidentialityImpact: String,
          integrityImpact: String,
          availabilityImpact: String,
          baseScore: Number,
        },
        baseSeverity: String,
        exploitabilityScore: Number,
        impactScore: Number,
        acInsufInfo: Boolean,
        obtainAllPrivilege: Boolean,
        obtainUserPrivilege: Boolean,
        obtainOtherPrivilege: Boolean,
        userInteractionRequired: Boolean,
      },
    ],
    cvssMetricV30: [
      {
        source : {type : String},
				type : {type : String},
        cvssData: {
          version: String,
          vectorString: String,
          accessVector: String,
          accessComplexity: String,
          privilegesRequired: String,
          userInteraction: String,
          scope: String,
          confidentialityImpact: String,
          integrityImpact: String,
          availabilityImpact: String,
          baseScore: Number,
          baseSeverity: String,
        },
        exploitabilityScore: Number,
        impactScore: Number,
      },
    ],
    cvssMetricV31: [
      {
        source : {type : String},
				type : {type : String},
        cvssData: {
          version: String,
          vectorString: String,
          accessVector: String,
          accessComplexity: String,
          privilegesRequired: String,
          userInteraction: String,
          scope: String,
          confidentialityImpact: String,
          integrityImpact: String,
          availabilityImpact: String,
          baseScore: Number,
          baseSeverity: String,
        },
        exploitabilityScore: Number,
        impactScore: Number,
      },
    ],
  },
  weaknesses: [
    {
      source : {type : String},
      type : {type : String},
      description: [
        {
          lang: String,
          value: String,
        },
      ],
    },
  ],
  configurations: [
    {
      nodes: [
        {
          operator: String,
          negate: Boolean,
          cpeMatch: [
            {
              vulnerable: Boolean,
              criteria: String,
              matchCriteriaId: String,
            },
          ],
        },
      ],
    },
  ],
  references: [
    {
      url: String,
      source: String,
      tags: [String],
    },
  ],
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
