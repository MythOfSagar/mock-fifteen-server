require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Router } = require("express");
const { UserModel } = require("../model/user.model");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const userData = req.body;

  try {
    bcrypt.hash(
      userData.password,
      +process.env.salt,
      async function (err, hash) {
        if (err) {
          res.send("Error A Please Try Again");
        } else {
          const User = new UserModel({ ...userData, password: hash });
          await User.save();

          res.send("Account Creation Successfull");
        }
      }
    );
  } catch (err) {
    res.send("Error B Please Try Again");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const UserWithEmail = await UserModel.findOne({ email });

    console.log(UserWithEmail);

    if (UserWithEmail) {
      bcrypt.compare(password, UserWithEmail.password, (err, result) => {
        if (result) {

          const token = jwt.sign({ key: email }, process.env.encrypt);

          res.send({ token: token, ...UserWithEmail, password: password });
          
        } else {
          res.send("Password is incorrect");
        }
      });
    } else {
      res.send("Email Not Found");
    }
  } catch (err) {
    res.send("Error Please Try Again");
  }
});

module.exports = { userRouter };
