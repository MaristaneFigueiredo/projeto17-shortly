import {userModel, authModel} from "../models/userModel.js";
import { validateUserExists } from "../controllers/authController.js";
import bcrypt from "bcrypt";

export async function signUpValidation(req, res, next) {
  const user = req.body;

  const { email } = req.body;

  const { error } = userModel.validate(user, { abortEarly: false }); // abortEarly:false = se existir mais de um erro traz todos

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(422).send(errors);
    //422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
  }

  const userExists = await validateUserExists(email);
  if (userExists.length > 0) {
    return res.status(409).send({ message: "Este email já cadastrado!" });
  }

  res.locals.user = user;

  next();
}

export async function signInValidation(req, res, next) {  
  const data = req.body;
  const { email, password } = req.body;


  const { error } = authModel.validate(data, { abortEarly: false }); // abortEarly:false = se existir mais de um erro traz todos

  if (error) { 
    const errors = error.details.map((d) => d.message);
    return res.status(422).send(errors);
    //422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
  }
 

  try {
    const userExists = await validateUserExists(email);   
    
    if ((userExists.length === 0)) {       
      return res
        .status(401)
        .send({ message: "Este email não está cadastrado!" });
    }
    
  
    const passwordRegistered =  userExists[0].password  
    const passwordOk = bcrypt.compareSync(password, passwordRegistered) // dois parâmetros: O dado que qro validar / dado encriptado
  

    if(!passwordOk){      
      return res.status(401).send({ message: "Usuário não autorizado!" });
    } 
    
    res.locals.user = userExists;
    
  

  } catch (error) {
    console.log('entrei no erro 500')
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }

  next();
}
