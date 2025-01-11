import { Router } from "express";
import UserController from "../controllers/UserController";
import Protect from "../../../shared/middlewares/ProtectMiddleware";

/**
 * User Router defines the routes related to user operations such as creating and displaying users.
 * It connects the routes to the respective controller methods and applies middleware for protection.
 */
const UserRouter = Router();
const userController = new UserController();

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
UserRouter.post("/post", Protect(userController.createUser.bind(userController)));

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
UserRouter.get("/get", Protect(userController.displayUsers.bind(userController)));

export default UserRouter;