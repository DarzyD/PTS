import {test, initializeDatabase, dropTables} from './databaseConn.js';
import dotenv from "dotenv";
dotenv.config();
test();
// initializeDatabase();
// console.log("Database initialized");
// dropTables();
// console.log("Tables dropped");