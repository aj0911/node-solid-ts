import { Router } from "express";
import UserController from "../controllers/UserController";
import Protect from "../../../shared/middlewares/ProtectMiddleware";


const UserRouter = Router();
const userController = new UserController();

UserRouter.post("/post", Protect(userController.createUser.bind(userController)));

UserRouter.get("/get", Protect(userController.displayUsers.bind(userController)));

export default UserRouter;