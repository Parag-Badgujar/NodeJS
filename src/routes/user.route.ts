import { Router } from "express";
import UserController from "../controllers/user.controller";
import { UserValidator } from "../validations/user.validator";
class UserRoute {
    public router: Router = Router();
    private userController: UserController = new UserController();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes(): void {
        this.router.post("/register", UserValidator, this.userController.register);
    }
}

export default new UserRoute().router;