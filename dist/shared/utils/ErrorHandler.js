"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom Error class for handling application-specific errors.
 * Extends the built-in `Error` class and adds an HTTP status code property.
 */
class ErrorHandler extends Error {
    /**
     * Creates an instance of the `ErrorHandler` class.
     *
     * @param {string} message - The error message.
     * @param {number} status - The HTTP status code for the error.
     */
    constructor(message, status) {
        super(message);
        this.status = status;
        // Captures the stack trace for the error
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
