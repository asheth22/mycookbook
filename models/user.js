const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  savedRecipes: {
      //User's saved recipes go in an array?
      //Maybe just links to actual recipe?
      recipes: []
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;