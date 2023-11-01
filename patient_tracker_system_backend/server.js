import express from "express";
import dotenv from "dotenv";
import loginRouter from "./routes/loginRoute.js";

const app = express();
app.use(express.json()); //to read request body

//use routes
app.use("/login", loginRouter);

app.listen(3001);

dotenv.config();
