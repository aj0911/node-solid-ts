import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

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
const ErrorMiddleware = (
  err: ErrorHandler & { path?: string; code?: number; keyValue?: object | {} },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default values for status and message if not provided
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";

  // Handle Mongoose CastError (e.g., invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource Not Found, Invalid ${err.path}`, 400);
  }

  //Handle duplicate key error, if duplicate entry is added to database.
  if (err.code === 11000) {
    err = new ErrorHandler(`${Object.keys(err.keyValue || {})} already Exists.`, 400);
  }

  // Send error response
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
