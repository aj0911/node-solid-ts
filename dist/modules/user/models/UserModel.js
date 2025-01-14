"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
/**
 * Mongoose Schema for the User Model
 *
 * This schema defines the structure of the `User` collection in the database,
 * including the fields, their types, validation rules, and additional options.
 */
// Define the user schema
const userSchema = new mongoose_1.Schema({
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
}, {
    /**
     * Enable automatic timestamps for `createdAt` and `updatedAt` fields.
     */
    timestamps: true,
});
/**
 * Mongoose Model for the User
 *
 * This model provides an interface to interact with the `User` collection in the database.
 * It implements the `IUser` interface for type safety.
 */
exports.default = mongoose_1.default.model("User", userSchema);
