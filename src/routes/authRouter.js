import { Router } from "express";
import { postSignUp, postSignIn } from "../controllers/authController.js";
import {
  //userModelValidation,
  signUpValidation,
  signInValidation,
} from "../middlewares/authValidationMiddleware.js";

const authRouter = Router();
authRouter.post("/signup", signUpValidation, postSignUp);
authRouter.post("/signin", signInValidation, postSignIn);

export default authRouter;
