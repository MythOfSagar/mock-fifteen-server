const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  companyName: String,
  position: String,
  contract: String,
  location: String,
  applicants:Array
});

const JobModel = mongoose.model("jobs", jobSchema);

module.exports = { JobModel };
