import express from "express";
import dotenv from "dotenv";
import loginRouter from "./routes/loginRoute.js";
import registerRouter from "./routes/registerRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import cors from 'cors';

const app = express();
app.use(express.json()); //to read request body

//use routes
app.use("/doctor", doctorRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.use(cors({
    origin: ['*'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.listen(3001);

dotenv.config();
