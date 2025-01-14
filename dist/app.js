"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const corsConfig_1 = __importDefault(require("./config/corsConfig"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const ErrorMiddleware_1 = __importDefault(require("./shared/middlewares/ErrorMiddleware"));
const http_1 = __importDefault(require("http"));
const userRouter_1 = __importDefault(require("./modules/user/routes/userRouter"));
/**
 * Express application setup with necessary middleware configurations.
 *
 * - Body parsing with JSON and URL encoding.
 * - File upload handling with size limits.
 * - Error handling middleware.
 * - CORS middleware with custom configuration.
 * - Routes for user-related API operations.
 */
const app = (0, express_1.default)();
/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express_1.default.json());
/**
 * Middleware to parse incoming body with a size limit of 200MB for JSON payloads.
 */
app.use(body_parser_1.default.json({ limit: "200mb" }));
/**
 * Middleware to parse URL-encoded data with a size limit of 200MB.
 */
app.use(body_parser_1.default.urlencoded({ limit: "200mb", extended: true }));
/**
 * Middleware for file uploads with a file size limit of 200MB.
 */
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 200 * 1024 * 1024 },
}));
/**
 * Mounting the UserRouter to handle user-related routes.
 * Prefixes all user routes with '/api/v1/user'.
 */
app.use('/api/v1/user', userRouter_1.default);
/**
 * Middleware to handle errors that occur during request processing.
 */
app.use(ErrorMiddleware_1.default);
/**
 * Enabling Cross-Origin Resource Sharing (CORS) for all routes with custom settings.
 */
app.use("*", (0, cors_1.default)(corsConfig_1.default));
/**
 * Creating and exporting the HTTP server for the application.
 */
exports.server = http_1.default.createServer(app);
/**
 * Export the app instance for testing or further configuration.
 */
exports.default = app;
