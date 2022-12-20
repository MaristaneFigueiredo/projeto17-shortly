import connectionDB from "../database/db.js";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
  const { url } = req.body;
  const shortUrl = nanoid(8);
  const userId = res.locals.user.id;

  try {
    await connectionDB.query(
      `
            INSERT INTO links ( userid, url, "shortUrl") VALUES($1, $2, $3)
            `,
      [userId, url, shortUrl]
    );

    res.status(201).send({ shortUrl: shortUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function getUrlId(req, res) {
 
  const {id} = req.params
  //console.log('id', id)
  try {
    const link = await connectionDB.query(
      `
        SELECT id, "shortUrl", "url" FROM links WHERE id = $1
      `,
      [id]
    );


    if (link.rows.length === 0) {
      res.status(404).send({ message: "url encurtada não existe!" })
    } else

    res.status(200).send(link.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
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

    
  

// export async function validateUrlShortenerExists() {
//   try {
    
//     const urlShortExists = await connectionDB.query(
//       `
//             SELECT * FROM links WHERE email = $1
//         `,
//       [urlShort]
//     );


//     if ((urlShortExists.rows.length === 0)) {       
//       return res
//         .status(404)
//         .send({ message: "Esta url encurtada não existe!" });
//     }

    
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Erro inesperado no servidor!" });
//   }
// }