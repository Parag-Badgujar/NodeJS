import { Request , Response} from "express";
import { validationResult } from "express-validator";

export default class UserController {
    async register(req : Request, res : Response): Promise<unknown> {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }
         
        return res.status(200).json({ message: "User registered successfully" });
    }
}