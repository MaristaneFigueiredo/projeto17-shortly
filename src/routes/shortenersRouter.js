import { Router } from "express";

import { postShorten, getUrlId, getShortUrl } from "../controllers/shortenersController.js";

// import {
  
//   postShorten,
//   getUrlId,
//   getShortUrl
// } from "../middlewares/shortenersMiddleware.js";

import tokenValidation from "../middlewares/tokenMiddleware.js";
  

const shortenersRouter = Router()


shortenersRouter.post("/urls/shorten", tokenValidation, postShorten);
shortenersRouter.get(" /urls/:id",  getUrlId);
shortenersRouter.get("/urls/open/:shortUrl",  getShortUrl);

export default shortenersRouter;