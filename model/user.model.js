const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  profilePicture: String,
  name: String,
  bio: String,
  phone: Number,
  email: String,
  password: String,
});

const UserModel=mongoose.model('users',userSchema)

module.exports ={UserModel}