import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const registerRouter = express.Router();

//@desc Login page
//@route GET /register
//@access Public
registerRouter.get("/", async (req, res) => {
    //TODO send login page back to frontend
}); 

//@desc Login user
//@route POST /login
//@access register
registerRouter.post("/", async (req, res) => {
    const {username, password, ssn, first, last, dob, city, state, address, phone, email, zip, gender} =  req.body;
    res.set('Content-Type', 'application/json');

    //TODO connect to db and try to add row

    if (/*success from db add row*/ true) {
        res.status(200);
        res.json({first: first, last: last, username: username});
    } else {
        res.status(401)
        res.json({})
    }

    //TODO check if username exists in doctor, patient, or admin table

    //TODO check if password matches hashed password in database
});

export default registerRouter;
