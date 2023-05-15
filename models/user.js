import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter your email,its required"],
    unique: [true, "Email already exists"],
    trim: true,
  },

  name: {
    type: String,
    required: [true, "Please enter your name,its required"],
    trim: true,
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },

  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
