import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const appointmentRouter = express.Router();

//@desc Login page
//@route GET /login
//@access Public
appointmentRouter.get("/", async (req, res) => {
    const {user = null, doctor = null} = req.query;
    if (!user && !doctor) {
        res.status(400);
        res.send();
    } else {
        if (user) {
            const text = "Select * from appointments where patientUsername = $1";
            const values = [user];
            const result = await db.query(text, values);
            if (result) {
                res.status(200);
                res.json(result?.rows);
            } else {
                res.status(500);
                res.send();
            }
        }  else {
            const text = "Select * from appointments where doctorUsername = $1";
            const values = [doctor];
            const result = await db.query(text, values);
            if (result) {
                res.status(200);
                res.json(result?.rows);
            } else {
                res.status(500);
                res.send();
            }
        }
    }
});

appointmentRouter.post("/", async(req, res) => {
    const {user, doctor, date, time} = req.body;
    
    const text = "INSERT INTO appointments VALUES ($1,$2,$3,$4)";
    const values = [user, doctor, time, date];
    const result = await db.query(text, values);
    if (result) {
        res.status(200);
        res.send();
    } else {
        res.status(500);
        res.send();
    }
})

appointmentRouter.delete("/", async (req, res) => {
    const {user, doctor, time, date} = req.body;
    const text = "Delete from appointments where patientusername = $1 and doctorusername = $2 and date = $3 and time = $4";
    const values = [user, doctor, date, time];
    const result = await db.query(text, values);
    if (result) {
        res.status(200);
        res.send();
    } else {
        res.status(500);
        res.send();
    }
})
export default appointmentRouter;