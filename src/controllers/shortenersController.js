import connectionDB from "../database/db.js";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
  
  const { url } = req.body;
  const shortUrl = nanoid(8);
 
  //console.log('res.locals.user', res.locals.user)
  const userId = res.locals.user.id


  try {
    await connectionDB.query(
      `
            INSERT INTO links ( userid, url, "shortUrl") VALUES($1, $2, $3)
            `,
      [userId, url, shortUrl]
    );

    res.sendStatus(201).send({"shortUrl": shortUrl});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}


export async function getUrlId(req, res) {
    //   const { name, password, email } = res.locals.user;
    //   const passwordHash = bcrypt.hashSync(password, 10);
    
    //   try {
    //     await connectionDB.query(
    //       `
    //             INSERT INTO users ( name, password, email) VALUES($1, $2, $3)
    //             `,
    //       [name, passwordHash, email]
    //     );
    
    //     res.sendStatus(201);
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(500).send({ message: "Erro inesperado no servidor!" });
    //   }
    }

    export async function getShortUrl(req, res) {
        //   const { name, password, email } = res.locals.user;
        //   const passwordHash = bcrypt.hashSync(password, 10);
        
        //   try {
        //     await connectionDB.query(
        //       `
        //             INSERT INTO users ( name, password, email) VALUES($1, $2, $3)
        //             `,
        //       [name, passwordHash, email]
        //     );
        
        //     res.sendStatus(201);
        //   } catch (error) {
        //     console.log(error);
        //     return res.status(500).send({ message: "Erro inesperado no servidor!" });
        //   }
        }