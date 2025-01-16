import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import User from "../../../types/User";
import ResponseHandler from "../../../shared/utils/ResponseHandler";

export default class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { name, email, password }: User = req.body;
    
    // Create the user through the UserService
    const user = await this._userService.register({
      name,
      email,
      password
    });

    // Send a success response with the created user data
    ResponseHandler(res,201,{
      success:true,
      message:'User Registered Successfully.',
      data:user
    })
  }

  async displayUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users: User[] = await this._userService.getAllUsers();

    // Send a success response with the list of users
    ResponseHandler(res,201,{
      success:true,
      message:'Users Recieved Successfully.',
      data:{
        count:users.length,
        users
      }
    })
  }
}
