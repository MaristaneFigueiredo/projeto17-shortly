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
  const { id } = req.params;
  //console.log('id', id)
  try {
    const link = await connectionDB.query(
      `
        SELECT id, "shortUrl", "url" FROM links WHERE id = $1
      `,
      [id]
    );

    if (link.rows.length === 0) {
      res.status(404).send({ message: "url encurtada não existe!" });
    } else res.status(200).send(link.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;
  //console.log('id', id)
  try {
    const { rows } = await connectionDB.query(
      `
        SELECT * FROM links WHERE "shortUrl" = $1
      `,
      [shortUrl]
    );

    const url = rows.pop();

    if (rows.length === 0)
      return res.status(404).send({ message: "url encurtada não existe!" });

    await connectionDB.query(
      `
      UPDATE links SET visitcount = visitcount + 1 WHERE id = $1
      `,
      [url.id]
    );

    res.redirect(`http://${url.url}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = res.locals.user.id;

  try {
    const url = await getUrlById(id);

    if (!url) return res.sendStatus(404);

    if (url.iduser !== userId)
      return res.status(401).send("URL não pertence a este usuário!");

    await connectionDB.query(
      `
          DELETE FROM links WHERE id = $1
          `,
      [id]
    );
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function getUrlById(id) {
  const queryText = "SELECT * FROM links WHERE id = $1";

  const { rows } = await connectionDB.query(
    `
      SELECT * FROM links WHERE id = $1
      `,
    [id]
  );

  return rows.pop();
}
