import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const newDoctorRouter = express.Router();



newDoctorRouter.post("/", async (req, res) => {
    console.log(req.body);
    const {username, first, last, dob, gender, middleInitial, ssn, address, city, state, zip, phone, email, password, npi} =  req.body;
    res.set('Content-Type', 'application/json');

    const doctors = await db.query("Select count(*) from doctors where doctorUsername = $1", [username]);
    const uniqueDoc = doctors?.rows[0]?.count == 0;
    console.log(uniqueDoc);
    if (!uniqueDoc) {
        res.status(403);
        res.json({error: "Username already exists"});
        res.send()
    } else {

        const text = 'INSERT INTO DOCTORS VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13, $14, $15) returning *';
        const values = [username, first, last, dob, gender, middleInitial, ssn, address, city, state, zip, phone, email, password, npi];
        console.log(values);
        const result = await db.query(text, values)
        console.log(result);
        if (/*success from db add row*/ result) {
            res.status(200);
            res.json({first: first, last: last, username: username});
        } else {
            res.status(403);
            res.json({});
        }
    }
})
export default newDoctorRouter;