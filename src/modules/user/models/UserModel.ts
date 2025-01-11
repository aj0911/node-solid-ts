import mongoose, { Schema, Model, Document } from "mongoose";
import User from "../../../types/User";

/**
 * Mongoose Schema for the User Model
 * 
 * This schema defines the structure of the `User` collection in the database,
 * including the fields, their types, validation rules, and additional options.
 */

// Define the user schema
const userSchema:Schema = new Schema(
  {
    /**
     * The name of the user.
     * @type {String}
     * @required
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * The email address of the user.
     * Must be unique across the database.
     * @type {String}
     * @required
     */
    email: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * The hashed password of the user.
     * @type {String}
     * @required
     */
    password: {
      type: String,
      required: true,
    },
  },
  {
    /**
     * Enable automatic timestamps for `createdAt` and `updatedAt` fields.
     */
    timestamps: true,
  }
);

/**
 * Mongoose Model for the User
 * 
 * This model provides an interface to interact with the `User` collection in the database.
 * It implements the `IUser` interface for type safety.
 */
export default mongoose.model<User>("User", userSchema);