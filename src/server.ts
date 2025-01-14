// import cluster from "cluster";
import dotenv from "dotenv";
import { server } from "./app";
import MongoDBDatabase from "./config/database";
// import os from "os";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

/**
 * Handles uncaught exceptions in the process.
 * Logs the error and shuts down the process.
 */
process.on("uncaughtException", (err: Error) => {
  console.error(`Error: ${err.message}`);
  console.error(
    "Shutting down the server due to an uncaught exception."
  );
  process.exit(1);
});

// Initialize and connect to MongoDB
const _mongoDBDatabase: MongoDBDatabase = new MongoDBDatabase();
_mongoDBDatabase.connect();

// if (cluster.isPrimary) {
//   /**
//    * Master Process:
//    * Spawns worker processes equal to the number of CPU cores.
//    */
//   const numCPUs = os.cpus().length;
//   console.log(`Primary process started with PID: ${process.pid}`);
//   console.log(`Forking ${numCPUs} workers...`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   /**
//    * Event Listener: Worker exit
//    * Logs when a worker exits and spawns a new one to maintain availability.
//    */
//   cluster.on("exit", (worker, code, signal) => {
//     console.error(
//       `Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`
//     );
//     console.log("Starting a new worker...");
//     cluster.fork(); // Restart a new worker process
//   });
// } else {
//   /**
//    * Worker Process:
//    * Starts the server and listens for incoming requests.
//    */
//   server.listen(process.env.PORT, () => {
//     console.log(
//       `Worker process ${process.pid} is running on http://localhost:${process.env.PORT}`
//     );
//   });

//   /**
//    * Handles unhandled promise rejections in the process.
//    * Logs the error and gracefully shuts down the server.
//    */
//   process.on("unhandledRejection", (err: Error) => {
//     console.error(`Error: ${err.message}`);
//     console.error(
//       "Shutting down the server due to an unhandled promise rejection."
//     );
//     server.close(() => {
//       process.exit(1);
//     });
//   });
// }

server.listen(process.env.PORT, () => {
  console.log(
    `server is running on http://localhost:${process.env.PORT}`
  );
});

/**
 * Handles unhandled promise rejections in the process.
 * Logs the error and gracefully shuts down the server.
 */
process.on("unhandledRejection", (err: Error) => {
  console.error(`Error: ${err.message}`);
  console.error(
    "Shutting down the server due to an unhandled promise rejection."
  );
  server.close(() => {
    process.exit(1);
  });
});
