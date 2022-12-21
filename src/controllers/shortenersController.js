import connectionDB from "../database/db.js";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
  const { url } = req.body;
  const shortUrl = nanoid(8);
  const userId = res.locals.user.id;

  try {
    const urlUpdate =
      "http://www." +
      url
        .replace("http://", "")
        .replace("https://", "")
        .replace("http://www.", "")
        .replace("https://www.", "")
        .replace("www.", "")
        .toLowerCase();

    await connectionDB.query(
      `
            INSERT INTO links ( userid, url, "shortUrl") VALUES($1, $2, $3)
            `,
      [userId, urlUpdate, shortUrl]
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

  try {
    const { rows } = await connectionDB.query(
      `
       SELECT id, url, visitcount FROM links WHERE "shortUrl" = $1
      `,
      [shortUrl]
    );

    if (rows.length === 0) {
      return res.status(404).send({ message: "url encurtada não existe!" });
    }

    addVisit(rows[0].id, rows[0].visitcount);
    const uri = rows[0].url;
    //res.redirect(`http://${uri}`);
    res.redirect(uri);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }

  async function addVisit(id, visitcount) {
    try {
      let visitPage = visitcount + 1;

      const { rows } = await connectionDB.query(
        `
       UPDATE links SET visitcount =${visitPage} WHERE id = $1
      `,
        [id]
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro inesperado no servidor!" });
    }
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = res.locals.user.id;

  try {
    const url = await getUrlById(id);

    if (!url) return res.status(404).send("URL não existe!");

    if (url.userid !== userId)
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
  const { rows } = await connectionDB.query(
    `
      SELECT * FROM links WHERE id = $1
      `,
    [id]
  );

  //console.log("rows.pop()", rows.pop());

  return rows.pop();
}

export async function getUserMe(req, res) {
  const user = res.locals.user;
  //console.log("user", user);

  try {
    const { rows } = await connectionDB.query(
      `
      SELECT id, "shortUrl", url, visitcount FROM links WHERE userid = $1
      `,
      [user.id]
    );
    const visitCountUrls = rows.map((e) => e.visitcount);
    const visitCount = visitCountUrls.reduce(
      (acumulador, elemento) => acumulador + elemento,
      0
    );

    const retorno = {
      id: user.id,
      name: user.name,
      visitCount,
      shortenedUrls: rows,
    };

    return res.status(200).send(retorno);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}
