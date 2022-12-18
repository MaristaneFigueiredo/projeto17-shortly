import bcrypt from "bcrypt"; //bcrypt - biblioteca do javascript para encriptar qualquer tipo de dado
import  jwt  from "jsonwebtoken";
import {v4 as uuidV4} from "uuid" // versão 4 é que gera string

import connectionDB from "../database/db.js";

export async function postSignUp(req, res) {
  const { name, password, email } = res.locals.user;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await connectionDB.query(
      `
            INSERT INTO users ( name, password, email) VALUES($1, $2, $3)
            `,
      [name, passwordHash, email]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}




export function postSignIn(req, res) {
  const user = res.locals.user;

  //const token = uuidV4()
  
  const SECRET = uuidV4() // senha utilizada p assinatura digital
  
  //const token = jwt.sign({userId: user.id}, SECRET, {expiresIn: 60 * 60 * 2} ) // 2 horas p expiração
  const token = jwt.sign({userId: user.id}, SECRET, {expiresIn: 300} ) // 5 minutos p expiração
  res.status(200).send(token)  

}



export async function validateUserExists(email) {
  try {
    
    const user = await connectionDB.query(
      `
            SELECT * FROM users WHERE email = $1
        `,
      [email]
    );
    return user.rows;
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}


/* Informações
O jwt possui 3 partes. 1) Metadados do jwt 2) payload 3) assinatura digital - ela feita usando payload + secret => é criptografada de fato
      //obs.: Payload em termos de protocolo é nada mais nada menos que seu conteúdo

Sintaxe assinando o jwt: informo payloaad/ SECRET/ tempo de expiração
Ex.: const token = jwt.sign({userId: user.id}, SECRET, {expiresIn: 300} ) // 5 minutos p expiração

senha utilizada p assinatura digital
*/