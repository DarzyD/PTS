import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const loginRouter = express.Router();

//@desc Login page
//@route GET /login
//@access Public
loginRouter.get("/", async (req, res) => {
    //TODO send login page back to frontend
});

//@desc Login user
//@route POST /login
//@access Public
loginRouter.post("/", async (req, res) => {
    const {username, password} =  req.body;
    const patient = await db.query(
        `Select 
            firstname as first,
            lastname as last,
            patientUsername as username
        from patients 
        where 
            patientUsername = $1 and 
            password = $2`,
    [username, password]);
    const doc = await db.query(
        `Select 
            firstname as first,
            lastname as last,
            doctorUsername as username,
            email,
            phonenumber as phone
        from doctors 
        where 
            doctorUsername = $1 and 
            password = $2`,
    [username, password]);
    const admin = await db.query(
        `Select
            adminUsername
        from admins 
        where 
            adminUsername = $1 and 
            password = $2`,
    [username, password]);


    res.set('Content-Type', 'application/json');
    if ( patient.rowCount == 1) {
        res.status(200);
        res.json({...patient.rows[0], userType: "patient"});
    } else if(doc.rowCount == 1){
        res.status(200).json({...doc.rows[0], userType: "doctor"});
    } else if (admin.rowCount == 1){
        res.status(200);
        res.json({...admin.rows[0], userType: "admin"});
    }else {
        res.status(401)
        res.json({})
    }


});

export default loginRouter;
