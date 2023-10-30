import express from 'express';
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
    const {username, password} =  req.body
    //TODO check if username exists in doctor, patient, or admin table

    //TODO check if password matches hashed password in database
});
