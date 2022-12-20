import { Router } from "express";

import { postShorten, getUrlId, getShortUrl } from "../controllers/shortenersController.js";

import tokenValidation from "../middlewares/tokenMiddleware.js"
import shortenerMiddleware from "../middlewares/shortenerMiddleware.js";
  
  

const shortenersRouter = Router()

shortenersRouter.post("/urls/shorten", shortenerMiddleware, tokenValidation, postShorten);        
    
shortenersRouter.get("/urls/:id", getUrlId);
// shortenersRouter.get("/urls/open/:shortUrl",  getShortUrl);

export default shortenersRouter;