import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const patientRouter = express.Router();

patientRouter.get("/", async (req, res) => {
    if (!req.query?.user) {
        // If no specific user is provided, fetch all patients' usernames
        const patients = await db.query("SELECT username FROM patients");
        res.status(200).json(patients);
      } else {
        // If a specific user is provided, fetch that patient's username
        const { user } = req.query;
        const patient = await db.query("SELECT username FROM patients WHERE user = $1", [user]);
        
        if (patient.rows.length > 0) {
          res.status(200).json(patient.rows[0]);
        } else {
          res.status(404).json({ message: 'Patient not found' });
        }
      }
}); 

export default patientRouter;