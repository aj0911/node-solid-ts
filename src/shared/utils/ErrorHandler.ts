/**
 * Custom Error class for handling application-specific errors.
 * Extends the built-in `Error` class and adds an HTTP status code property.
 */
export default class ErrorHandler extends Error {
    /**
     * The HTTP status code associated with the error.
     */
    status: number;
  
    /**
     * Creates an instance of the `ErrorHandler` class.
     * 
     * @param {string} message - The error message.
     * @param {number} status - The HTTP status code for the error.
     */
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
  
      // Captures the stack trace for the error
      Error.captureStackTrace(this, this.constructor);
    }
  }