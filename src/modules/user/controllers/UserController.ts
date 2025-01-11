import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import User from "../../../types/User";
import ErrorHandler from "../../../shared/utils/ErrorHandler";

/**
 * Controller for managing user-related actions, such as creating and retrieving users.
 * It interacts with the `UserService` to perform operations related to user data.
 */
export default class UserController {
  private _userService: UserService;

  /**
   * Initializes the `UserController` and creates an instance of `UserService`.
   */
  constructor() {
    this._userService = new UserService();
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
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { name, email, password }: User = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) 
      return next(new ErrorHandler('All Fields are mandatory', 200));
    
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
  async displayUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users: User[] = await this._userService.getAll();

    // Send a success response with the list of users
    res.status(201).json({ success: true, data: users });
  }
}
