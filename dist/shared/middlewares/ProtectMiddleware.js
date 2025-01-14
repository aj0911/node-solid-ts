"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Higher-order function that wraps an asynchronous Express route handler to catch errors.
 * This is used to avoid repetitive try/catch blocks in route handlers.
 *
 * @param {Function} func - The asynchronous route handler function that takes in `req`, `res`, and `next` arguments.
 * @returns {Function} - A new function that automatically catches and forwards errors to the next middleware.
 */
const Protect = (func) => (req, res, next) => {
    // Executes the provided function and catches any errors, forwarding them to the next middleware.
    Promise.resolve(func(req, res, next)).catch(next);
};
exports.default = Protect;
