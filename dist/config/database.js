"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Implementation of the `Database` interface for connecting to a MongoDB database.
 */
class MongoDBDatabase {
    /**
     * Establishes a connection to the MongoDB database using Mongoose.
     *
     * @returns {Promise<void>} A promise that resolves when the connection is successful.
     * @throws Will log an error message if the connection fails.
     */
    async connect() {
        try {
            if (process.env.MONGO_URI) {
                const data = await mongoose_1.default.connect(process.env.MONGO_URI || "", {
                    dbName: process.env.DB_Name || 'TestMongoDBApp'
                });
                console.log(`MongoDB is connected with the server: ${data.connection.host}`);
            }
            else {
                console.log('MongoDB is not connected because of empty MONGO_URI in env.');
            }
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
        }
    }
}
exports.default = MongoDBDatabase;
