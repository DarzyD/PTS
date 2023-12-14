import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const appointmentRouter = express.Router();

//@desc Login page
//@route GET /login
//@access Public
appointmentRouter.get("/", async (req, res) => {
    //TODO send login page back to frontend
});

appointmentRouter.post("/", async(req, res) => {
    const {user, doctor, date, time} = req.body;
    
    const text = "INSERT INTO appointments VALUES ($1,$2,$3,$4)";
    const values = [user, doctor, date, time];
    const result = db.query(text, values);
    if (result) {
        res.status(200);
        res.send();
    } else {
        res.status(500);
        res.send();
    }
})
export default appointmentRouter;