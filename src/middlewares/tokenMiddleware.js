import jwt from "jsonwebtoken";
import { secret } from "../config/config.js";
import { returnUserById } from "../controllers/authController.js";
//import dotenv from 'dotenv'

export default async function tokenValidation(req, res, next) {
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

    //console.log("user.id teste", user.id);
    if (!user) {
      return res.status(401).send({ message: "Usuário não autorizado!" });
    } else {
      const userExists = (await returnUserById(user.id)) ? true : false;

      if (userExists === false)
        return response.status(404).send("Usuário não existe!");
    }

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

// const decodedToken = jwt.decode(token, {complete:true})
// console.log('decodedToken', decodedToken)
