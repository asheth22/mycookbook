const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { config } from "dotenv";
import validator from "validator";

// config();

const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email address"],
    required: [true, 'Email is required'],
    unique: true

  },
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    unique: false
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    unique: false
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
  },
  joinRecipe : [{type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next;

  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.HASH)
  );
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, jwtPrivateSecret, {
    expiresIn: "10d",
    algorithm: "RS256",
  });
};

userSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await User.findOne({ [`${field}`]: value });
  
    return checkField;
};

const User = mongoose.model("User", userSchema);

export default User;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   savedRecipes: {
//       //User's saved recipes go in an array?
//       //Maybe just links to actual recipe?
//       recipes: []
//   }
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;