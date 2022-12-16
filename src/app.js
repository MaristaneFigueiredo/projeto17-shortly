import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import logoutRouter from "./routes/authRouter.js";
import shortenersRouter from "./routes/authRouter.js";
import usersRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//routes - para as rotas funcionarem elas precisam ser chamadas
app.use(authRouter);
app.use(logoutRouter);
app.use(shortenersRouter);
app.use(usersRouter);


const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));
