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
    res.set('Content-Type', 'application/json');

    if (username == "hello") {
        console.log("good");
        res.status(200);
        res.json({first: "Hello", last: "World", username: username});
    } else {
        res.status(401)
        res.json({})
    }

    //TODO check if username exists in doctor, patient, or admin table

    //TODO check if password matches hashed password in database
});

export default loginRouter;
