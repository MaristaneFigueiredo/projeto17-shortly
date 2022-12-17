import bcrypt from "bcrypt";


import connectionDB from "../database/db.js";

export async function postSignUp(req, res) {
   // const user = res.locals.user;
   const {name, password, email} = res.locals.user;
   const passwordHash = bcrypt.hashSync(password, 10)

       
   console.log('entrei aqui - name, passwordHash, email', name,passwordHash, email)
    try{

        await connectionDB.query(
            `
            INSERT INTO users ( name, password, email) VALUES($1, $2, $3);
            `
        ,[name, passwordHash, email]
        )
        console.log('entrei aqui2')
        
        res.sendStatus(201)

    } catch(error) {
        console.log(error)
        return res.status(500).send({message: "Erro inesperado no servidor!"})
    }
}



export async function postSignIn(req, res) {
    try{

    } catch(error) {
        console.log(error)
        return res.status(500).send({message: "Erro no servidor!"})

    }
}