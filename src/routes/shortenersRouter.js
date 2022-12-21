import { Router } from "express";

import {
  postShorten,
  getUrlId,
  getShortUrl,
  deleteUrl,
  getUserMe,
} from "../controllers/shortenersController.js";

import tokenValidation from "../middlewares/tokenMiddleware.js";
import shortenerMiddleware from "../middlewares/shortenerMiddleware.js";

const shortenersRouter = Router();

shortenersRouter.post(
  "/urls/shorten",
  shortenerMiddleware,
  tokenValidation,
  postShorten
);

shortenersRouter.get("/urls/:id", getUrlId);

shortenersRouter.get("/urls/open/:shortUrl", getShortUrl);

shortenersRouter.delete("/urls/:id", tokenValidation, deleteUrl);

shortenersRouter.get("/users/me", tokenValidation, getUserMe);

export default shortenersRouter;
