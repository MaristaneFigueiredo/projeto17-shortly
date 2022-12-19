import jwt from "jsonwebtoken"
import { secret } from "../config/config.js";
//import dotenv from 'dotenv'

export default async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
  
    const token = authorization?.replace("Bearer ", "");
  
    if (!token) {
      return res.status(401).send({ message: "Usuário não autorizado!" });
    }

    
    // jwt.verify(token, a chave secreta da minha aplicacao , funçao callback, onde é o posso ter o erro, ou o token decodificado   
    const user = jwt.verify(token, secret, (erro ) => {
      if(erro)
         // return false
         return res.status(401).send({ message: "Usuário não autorizado!" })

      else return jwt.decode(token)
      // teste = decoded.dateUser
      //console.log('teste', teste)
  })

    console.log('user', user)
    // if (!user) {
    //   return res.status(401).send({ message: "Usuário não autorizado!" });
    // }
  
  
    
     res.locals.user = user;
  
    next();
  }