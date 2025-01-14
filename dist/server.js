"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const database_1 = __importDefault(require("./config/database"));
const os_1 = __importDefault(require("os"));
// Load environment variables from .env file
dotenv_1.default.config({ path: ".env" });
/**
 * Handles uncaught exceptions in the process.
 * Logs the error and shuts down the process.
 */
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to an uncaught exception.");
    process.exit(1);
});
// Initialize and connect to MongoDB
const _mongoDBDatabase = new database_1.default();
_mongoDBDatabase.connect();
if (cluster_1.default.isPrimary) {
    /**
     * Master Process:
     * Spawns worker processes equal to the number of CPU cores.
     */
    const numCPUs = os_1.default.cpus().length;
    console.log(`Primary process started with PID: ${process.pid}`);
    console.log(`Forking ${numCPUs} workers...`);
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    /**
     * Event Listener: Worker exit
     * Logs when a worker exits and spawns a new one to maintain availability.
     */
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.error(`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`);
        console.log("Starting a new worker...");
        cluster_1.default.fork(); // Restart a new worker process
    });
}
else {
    /**
     * Worker Process:
     * Starts the server and listens for incoming requests.
     */
    app_1.server.listen(process.env.PORT, () => {
        console.log(`Worker process ${process.pid} is running on http://localhost:${process.env.PORT}`);
    });
    /**
     * Handles unhandled promise rejections in the process.
     * Logs the error and gracefully shuts down the server.
     */
    process.on("unhandledRejection", (err) => {
        console.error(`Error: ${err.message}`);
        console.error("Shutting down the server due to an unhandled promise rejection.");
        app_1.server.close(() => {
            process.exit(1);
        });
    });
}
