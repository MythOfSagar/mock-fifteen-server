require("dotenv").config();

const {userRouter}=require('./routes/user.route')
const express = require("express");
const { connection } = require("./config/db");

const app = express();

app.use(express.json())

app.use('/users',userRouter)

app.get('/',(req,res)=>{
res.send("Auth Home Page")
})

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
});
