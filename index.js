require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const {userRouter}=require('./routes/user.route')
const {jobRouter}=require('./routes/job.route')

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/user',userRouter)
app.use('/job',jobRouter)

app.get("/", (req, res) => {
  res.send("HOME");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Success in Connection");
  } catch (err) {
    console.log("Error in Connection",err);
  }
});
