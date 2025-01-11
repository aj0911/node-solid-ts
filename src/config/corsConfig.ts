import { CorsOptions } from "cors";
import ErrorHandler from "../shared/utils/ErrorHandler";

/**
 * List of allowed origins for CORS configuration.
 * These URLs are fetched from environment variables.
 */
const allowedOrigins: string[] = [
  process.env.FRONTEND_PROD_BASE_URL!, // Production frontend URL
  process.env.FRONTEND_DEV_BASE_URL!,  // Development frontend URL
];

/**
 * CORS configuration object for the application.
 * 
 * - `credentials`: Allows credentials such as cookies to be sent in cross-origin requests.
 * - `origin`: A function to check if the request's origin is allowed.
 */
const corsConfig: CorsOptions = {
  credentials: true, // Enables cookies and credentials
  /**
   * Determines if the request's origin is allowed.
   * 
   * @param {string | undefined} origin - The origin of the incoming request.
   * @param {(err: Error | null, allow?: boolean) => void} callback - A callback to indicate if the origin is allowed.
   */
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the list of allowed origins
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg: string =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new ErrorHandler(msg,404), false);
    }

    // Allow the request if the origin is valid
    return callback(null, true);
  },
};

export default corsConfig;
