"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const ErrorHandler_1 = __importDefault(require("../../../shared/utils/ErrorHandler"));
/**
 * Controller for managing user-related actions, such as creating and retrieving users.
 * It interacts with the `UserService` to perform operations related to user data.
 */
class UserController {
    /**
     * Initializes the `UserController` and creates an instance of `UserService`.
     */
    constructor() {
        this._userService = new UserService_1.default();
    }
    /**
     * Creates a new user by receiving data from the request body.
     * The function validates that all required fields are present and creates a new user.
     *
     * @param {Request} req - The request object, containing the data for the new user.
     * @param {Response} res - The response object to send the created user as a response.
     * @param {NextFunction} next - The next middleware function to handle errors.
     * @returns {Promise<void | NextFunction>} - Sends a response with the created user data or forwards an error if validation fails.
     */
    async createUser(req, res, next) {
        const { name, email, password } = req.body;
        // Check if all required fields are provided
        if (!name || !email || !password)
            return next(new ErrorHandler_1.default('All Fields are mandatory', 200));
        // Create the user through the UserService
        const user = await this._userService.create({
            name,
            email,
            password,
        });
        // Send a success response with the created user data
        res.status(201).json({ success: true, data: user });
    }
    /**
     * Retrieves all users from the database and sends them as a response.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object to send the list of users.
     * @param {NextFunction} next - The next middleware function to handle any errors.
     * @returns {Promise<void>} - Sends a response with the list of all users.
     */
    async displayUsers(req, res, next) {
        const users = await this._userService.getAll();
        // Send a success response with the list of users
        res.status(201).json({ success: true, data: users });
    }
}
exports.default = UserController;
