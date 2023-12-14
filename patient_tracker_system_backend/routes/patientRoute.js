import express, { application } from 'express';
import bcrypt from 'bcrypt';
import db from '../databaseConn.js';

const patientRouter = express.Router();

