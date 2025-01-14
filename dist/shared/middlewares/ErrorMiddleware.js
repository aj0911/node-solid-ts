"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
/**
 * Middleware to handle errors in the application.
 *
 * @param {ErrorHandler & {path?:string}} err - The error object containing the message and status code.
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function in the request-response cycle.
 *
 * This middleware standardizes error responses by sending a consistent JSON structure with the
 * `success` flag and error `message`. It also handles specific errors, like Mongoose's `CastError`.
 */
const ErrorMiddleware = (err, req, res, next) => {
    // Set default values for status and message if not provided
    err.status = err.status || 500;
    err.message = err.message || "Internal Server Error";
    // Handle Mongoose CastError (e.g., invalid MongoDB ObjectId)
    if (err.name === "CastError") {
        err = new ErrorHandler_1.default(`Resource Not Found, Invalid ${err.path}`, 400);
    }
    //Handle duplicate key error, if duplicate entry is added to database.
    if (err.code === 11000) {
        err = new ErrorHandler_1.default(`${Object.keys(err.keyValue || {})} already Exists.`, 400);
    }
    // Send error response
    res.status(err.status).json({
        success: false,
        message: err.message,
    });
};
exports.default = ErrorMiddleware;
