import express from "express";
import dotenv from "dotenv";
import loginRouter from "./routes/loginRoute.js";
import registerRouter from "./routes/registerRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import newDoctorRouter from "./routes/addDoctorRoute.js"
import cors from 'cors';

const app = express();
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 } //https://stackoverflow.com/a/46988108
app.use(express.json()); //to read request body
app.use(cors(corsOptions));
//use routes
app.use("/doctor", doctorRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/newDoctor", newDoctorRouter);



app.listen(3001, () =>{
    console.log("Server started on port 3001");
});

dotenv.config();
