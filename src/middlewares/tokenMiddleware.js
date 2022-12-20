import jwt from "jsonwebtoken";
import { secret } from "../config/config.js";
//import dotenv from 'dotenv'

export default function tokenValidation(req, res, next) {
  try {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ message: "Usuário não autorizado!" });
    }

    const user = jwt.verify(token, secret, (erro) => {
      if (erro) return false;
      else return jwt.decode(token);
    });

    if (!user) {
      return res.status(401).send({ message: "Usuário não autorizado!" });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

// const decodedToken = jwt.decode(token, {complete:true})
// console.log('decodedToken', decodedToken)
