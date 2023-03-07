const { Router } = require("express");
require("dotenv").config();
const { JobModel } = require("../models/job.model");

const jobRouter = Router();

jobRouter.get("/", async (req, res) => {
   
    try {
      const allJobs = await JobModel.find();
      
      res.status(200).send(allJobs);
    } catch (err) {
      res.status(400).send("Errr Occured");
    }
  });

jobRouter.post("/create", async (req, res) => {
  const jobData = req.body;

  try {
    const newJob = new JobModel({ ...jobData });
    await newJob.save();
    res.status(200).send("Job Creation Successful");
  } catch (err) {
    res.status(400).send("Errr Occured");
  }
});

jobRouter.delete("/delete/:id", async (req, res) => {
   
  const {id}=req.params

    try {
      await JobModel.findByIdAndDelete(id)
      res.status(200).send("Deletion Successful");
   
    } catch (err) {
      res.status(400).send("Errr Occured");
    }
  });


  jobRouter.patch("/edit/:id", async (req, res) => {
   
    const {id}=req.params
    const jobData = req.body;
      try {
        await JobModel.findByIdAndUpdate(id,{
            ...jobData
        })
        res.status(200).send("Edited Successfully");
     
      } catch (err) {
        res.status(400).send("Errr Occured");
      }
    });

    jobRouter.patch("/apply/:id", async (req, res) => {
   
        const {id}=req.params
        const {userId} = req.body;

          try {
            let findJob =await JobModel.findById(id)
            const applicants=findJob.applicants

            await JobModel.findByIdAndUpdate(id,{
                applicants:[...applicants,userId]
            })
            res.status(200).send("Applied Successfully");
         
          } catch (err) {
            res.status(400).send("Errr Occured");
          }
        });

module.exports = { jobRouter };
