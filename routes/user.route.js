const { Router } = require("express");
require("dotenv").config();
const { UserModel } = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(
      password,
      Number(process.env.SaltRounds),
      async function (err, hash) {
        if (err) {
          res.status(400).send("Errr Occured");
        } else {
          const newUser = new UserModel({ name, email, password: hash });
          await newUser.save();
          res.status(200).send("Account Creation Successful");
        }
      }
    );
  } catch (err) {
    res.status(400).send("Errr Occured");
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    let findUserByEmail =await UserModel.findOne( {email} );

    if (findUserByEmail) {
      bcrypt.compare(
        password,
        findUserByEmail.password,
        function (err, result) {
          if (result) {
            const token = jwt.sign(
              { userId: findUserByEmail._id },
              process.env.SaltRounds
            );

            res.status(200).send({token:token,userId:findUserByEmail._id});
          } else {
            res.status(400).send({ err: "Wrong password" });
          }
        }
      );
    } else {
      res.status(400).send({ err: "Email not found" });
    }
  } catch (err) {
    res.status(400).send({ err: "Error occured" });
  }
});

module.exports = { userRouter };
