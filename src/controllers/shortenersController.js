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
  const {shortUrl} = req.params
  //console.log('id', id)
  try {
    const {rows} = await connectionDB.query(
      `
        SELECT * FROM links WHERE "shortUrl" = $1
      `,
      [shortUrl]
    );


    if (rows.length === 0) 
     return res.status(404).send({ message: "url encurtada não existe!" })
    
    const url = rows.pop()

    res.redirect(`http://${url.url}`)
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
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