"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("../shared/utils/ErrorHandler"));
/**
 * List of allowed origins for CORS configuration.
 * These URLs are fetched from environment variables.
 */
const allowedOrigins = [
    process.env.FRONTEND_PROD_BASE_URL, // Production frontend URL
    process.env.FRONTEND_DEV_BASE_URL,
];
/**
 * CORS configuration object for the application.
 *
 * - `credentials`: Allows credentials such as cookies to be sent in cross-origin requests.
 * - `origin`: A function to check if the request's origin is allowed.
 */
const corsConfig = {
    credentials: true, // Enables cookies and credentials
    /**
     * Determines if the request's origin is allowed.
     *
     * @param {string | undefined} origin - The origin of the incoming request.
     * @param {(err: Error | null, allow?: boolean) => void} callback - A callback to indicate if the origin is allowed.
     */
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        // Check if the origin is in the list of allowed origins
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new ErrorHandler_1.default(msg, 404), false);
        }
        // Allow the request if the origin is valid
        return callback(null, true);
    },
};
exports.default = corsConfig;
