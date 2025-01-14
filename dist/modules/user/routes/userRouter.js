"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const ProtectMiddleware_1 = __importDefault(require("../../../shared/middlewares/ProtectMiddleware"));
/**
 * User Router defines the routes related to user operations such as creating and displaying users.
 * It connects the routes to the respective controller methods and applies middleware for protection.
 */
const UserRouter = (0, express_1.Router)();
const userController = new UserController_1.default();
/**
 * Route to create a new user.
 *
 * @route POST /post
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} - Creates a user and returns a response with the created user data.
 * @middleware Protect - Ensures that the request is authenticated.
 */
UserRouter.post("/post", (0, ProtectMiddleware_1.default)(userController.createUser.bind(userController)));
/**
 * Route to retrieve all users.
 *
 * @route GET /get
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the list of users.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} - Retrieves all users and returns them as a response.
 * @middleware Protect - Ensures that the request is authenticated.
 */
UserRouter.get("/get", (0, ProtectMiddleware_1.default)(userController.displayUsers.bind(userController)));
exports.default = UserRouter;
