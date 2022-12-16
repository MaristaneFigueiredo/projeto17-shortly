import { Router } from "express";
import { postSignUp, postSignIn } from "../controllers/authController.js";
import {userModelValidation} from "../middlewares/authValidationMiddleware.js"

const authRouter = Router();
authRouter.post("/signup",userModelValidation, postSignUp);
authRouter.post("/signin", postSignIn);

export default authRouter;