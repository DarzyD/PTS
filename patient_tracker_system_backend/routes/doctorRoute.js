import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const doctorRouter = express.Router();


//@route GET /doctor
//@access Public
doctorRouter.get("/", async (req, res) => {
    
    // const requestBody = await req.json();
    if (!req.query?.user ) {
        console.log("all Doctors");
        const docs = await db.query("select firstname as first, lastname as last, email, phonenumber as phone, npi from doctors");
        console.log(docs);
        res.status(200);
        res.json(docs.rows); //return all the doctors
    } else {
        const myDoc = await db.query("select doctorUsername from patients where doctorUsername = $1", [req.query?.user])
        const doc = await db.query("select firstname as first, lastname as last, email, phonenumber as phone, npi from doctors where doctorUsername = $1", [myDoc]);
        res.status(200);
        res.json(doc?.rows[0]); //return only my doc
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

doctorRouter.post("/appointments", async (req, res) => { 
    const {username, password} =  req.body;
    db.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }else{
            db.query('SELECT * FROM DOCTORS;', function(err, result) {
                if(err) {
                  return console.error('error running query', err);
                }
                console.log(result);
                db.end();
              });
        }
    });
});
//for testing
doctorRouter.post("/test/appointments", async (req, res) => { 
    const {username, password} =  req.body;
    let dbRes = await db.query('SELECT * FROM DOCTORS;');
    console.log(dbRes);
    const doctorAppointmentQuery = `SELECT * FROM APPOINTMENTS WHERE doctorusername = $1;`;
    const values = [username];
    console.log(username);
    dbRes = await db.query(doctorAppointmentQuery, values);
    console.log("APPOINTMENTS")
    console.log(dbRes);
    await db.end();
    res.status(200).send("test");
    // const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
    // const values = ['brianc', 'brian.m.carlson@gmail.com']
 
    // const res = await client.query(text, values)
    // console.log(res.rows[0])
    // // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
});
export default doctorRouter;
