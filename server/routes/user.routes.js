import { Router } from "express";
import { userLogin, userRegister } from "../controllers/admin.controllers.js";

const userRouter = Router();

userRouter.route('/login').post(userLogin);
userRouter.route('/register').post(userRegister);

export default userRouter;


