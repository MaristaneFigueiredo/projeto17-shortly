import jwt from "jsonwebtoken";
import { secret } from "../config/config.js";
//import dotenv from 'dotenv'

// export default async function tokenValidation(req, res, next) {
export default function tokenValidation(req, res, next) {

  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
      return res.status(401).send({ message: "Usuário não autorizado!" });
  }

    
  const user = jwt.verify(token, secret, (erro ) => {
  if(erro)
      return res.status(401).send({ message: "Usuário não autorizado!" })
  else
     return jwt.decode(token)

  })

  // const user = jwt.verify(token, secret, (erro ) => {
  //   if(erro){
  //     console.log('entrei aqui dentro VERIFY')
  //       return res.status(401).send({ message: "Usuário não autorizado!" })
  //   }
  //   else
       
  //      return jwt.decode(token)
  
  //   })
  

  // const decodedToken = jwt.decode(token, {complete:true})
  // console.log('decodedToken', decodedToken)

  
  // if (!user) {
  //  // console.log('entrei aqui dentro !user', !user)
  //   return res.status(401).send({ message: "Usuário não autorizado!" });
  // }

   res.locals.user = user;

  
  //console.log('continuo aqui')
  next();
}


// jwt.verify(token, a chave secreta da minha aplicacao , funçao callback, onde é o posso ter o erro, ou o token decodificado

// export default function tokenValidation(req, res, next) {
//   try {
//     const { authorization } = req.headers;

//     const token = authorization?.replace("Bearer ", "");
//     let teste;

//     const user = jwt.verify(token, secret, (erro) => {
//       if (erro) return false;
//       else return jwt.decode(token);
    
//     });

//     if (!user) return res.status(401).send("Token inválido");   
    
    

//     res.locals.user = user;
//     console.log("retornarBearerToken -res.locals.user", res.locals.user);

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Erro interno no servidor!");
//   }
// }
