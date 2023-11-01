import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const doctorRouter = express.Router();


//@route GET /doctor
//@access Public
doctorRouter.get("/", async (req, res) => {
    const docs = [
        {
            name: "Fred Flintstone", email: "FFlint@doc.doc", phone:"123-555-4532", username: "fredflint"
        },
        {
            name: "Laura Hardwater", email: "LH@doc.doc", phone:"123-555-7753", username: "Lhard"
        },
        {
            name: "Nan Naime", email: "nnaime@doc.doc", phone:"123-555-9874", username: "nanna"
        }
    ]

    // const requestBody = await req.json();
    if (!req.query?.user) {
        res.status(200);
        res.json(docs); //return all the doctors
    } else {
        res.status(200);
        res.json(docs[0]); //return only my doc
    }
}); 

//@desc new doctor user
//@route POST /doctor
//@access register
doctorRouter.post("/", async (req, res) => {
    const {user, doctor: {username: docUsername} } =  req.body;
    res.set('Content-Type', 'application/json');

    
    //TODO connect to db and try to change user's doc to docUsername

    if (/*success from db add row*/ true) {
        res.status(200);
    } else {
        res.status(401)
    }

    //TODO check if username exists in doctor, patient, or admin table

    //TODO check if password matches hashed password in database
});

export default doctorRouter;
