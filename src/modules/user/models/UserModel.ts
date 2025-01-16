import mongoose, { Schema, Model, Document } from "mongoose";
import User from "../../../types/User";


// Define the user schema
const userSchema:Schema = new Schema(
  {

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", userSchema);